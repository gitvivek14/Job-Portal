const jwt = require("jsonwebtoken")
const User = require("../models/User")

require("dotenv").config();

const authmiddleware = async(req,res,next)=>{ 
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1] // Extract token from Bearer scheme
            : req.cookies.token;
        if(!token){
            return  res.status(400).json
            ({message:"no tokens",
                     success: false})
        }
        try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            console.log("printing user",decode)
            next();
        } catch (error) {
            return  res.status(401).json
            ({message:"TOKEN INVALID",
                     success: false})
        }
}

module.exports = authmiddleware;