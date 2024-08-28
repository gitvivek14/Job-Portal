const User = require("../models/User");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getapplications = async(req,res)=>{
    try {
        const applications = await Application.find({
            user:req.user.id
        }).populate('job');

        return res.status(200).json({
            applications
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
exports.updateapplication = async(req,res)=>{
    try {
        const application = await Application.findById(req.body.id);
        if(!application){
            return res.status(404).json({ message: 'Application not found' });
        }
        if (application.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }
        application.status = req.body.status || application.status;
        await application.save();

        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


//application tracking
//enhance filtering

