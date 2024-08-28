const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {z} = require('zod');


const Profile = require("../models/Profile");
// const { use } = require("../app");

const signupSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    accounttype: z.enum(["Admin", "User", "Employer"]),
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register= async(req,res)=>{
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors: errors.array()});
    // }

   
    try {
      const data = signupSchema.parse(req.body);
      const {firstname,lastname,email,password,accounttype} = data;
      const userexists = await User.findOne({email:email});
      if(userexists){
        return res.status(400).json({msg:"Email already exists"})
      }

      const salt  = await bcrypt.genSalt(4);

      const hashedpass = await bcrypt.hash(password,salt);


      const user = await User.create({
        firstname,
        lastname,
        email,
        password:hashedpass,
        accounttype
      });

      
      const profile = await Profile.create({
        user: user._id,
        accounttype: user.accounttype,
        
    });

      console.log("created user",user)

      return res.status(201).json({
        success:true,
        message:"REGISTERED SUCCESSFULLY",
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        accounttype: user.accounttype,
        token: generateToken(user._id),
        profile:profile._id
      })

        
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(400).json({
                errors:error.errors
            })
        }
    }
}

exports.login = async(req,res)=>{
    try {
        const data = loginSchema.parse(req.body);
        const {email,password} = data;

        const user = await User.findOne({email:email});

        if (!user) {
            return res.status(400).json({ message: 'No user exists' });
        }

        const ismatch = await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        })

        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                accounttype: user.accounttype,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ message: 'Server error' });
    }
}

