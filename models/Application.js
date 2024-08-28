const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    job:{
        type:mongoose.Schema.ObjectId,
        ref:'Job',
        required:true,
    },
    status:{
        type:String,
        enum: ['applied', 'reviewed', 'accepted', 'rejected'],
        default:"applied"
    }
},{timestamps:true})

module.exports = mongoose.model('Application',ApplicationSchema)