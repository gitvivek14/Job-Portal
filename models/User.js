const mongoose = require('mongoose')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                return emailRegex.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:true
    },
    accounttype:{
        type:String,
        required:true,
        enum:["Admin","User","Employer"]
    },
    profile :{
        type:mongoose.Schema.ObjectId,
        ref:"Profile",
    }
},{timestamps:true})
module.exports = mongoose.model("User",UserSchema);