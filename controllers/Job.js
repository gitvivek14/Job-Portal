const User = require("../models/User");
const Job = require("../models/Job")
const Profile = require("../models/Profile")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require('zod');

exports.getalljobs = async(req,res)=>{
    try {
        const jobs = await Job.find({});
        return res.status(200).json({
            jobs:jobs,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getalljobs = async(req,res)=>{
    try {
        const { location, jobType, title, experience, compensation } = req.query;
        const filter = {};
        if (location) filter.location = location;
        if (jobType) filter.jobType = jobType;
        if (title) filter.title = new RegExp(title, 'i'); // Case-insensitive regex for title search
        if (experience) filter.experienceRequired = { $lte: experience };
        if (compensation) filter.compensation = { $gte: compensation };
        const jobs =  await Job.find(filter);
        return res.status(200).json({
            jobs:jobs,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//create a job posting


exports.createjob = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const accountType = user.accounttype;
        if(accountType!=='Employer'){
            return res.status(403).json({ message: 'Only employers can post jobs' });
        }

        const jobData = req.body;
        jobData.employer = req.user.id;

        const newJob = new Job(jobData);

        await newJob.save();

        const profile = await Profile.findOne({
            user:req.user.id
        });
        profile.jobs.push(newJob._id);

        await profile.save();

        return res.status(201).json(newJob);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}



exports.getjobbyid = async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const accountType = user.accounttype;
        if(accountType!=='Employer'){
            return res.status(403).json({ message: 'Only employers can post jobs' });
        }
        const jobs = await Job.find({ employer: req.user.id });
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.editjob = async(req,res)=>{
    try {
        const job = await Job.findById(req.body.id);

        if (!job || job.employer.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        Object.assign(job, req.body.data);
        await job.save();

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deletejob = async(req,res)=>{
    try {
        const job = await Job.findById(req.body.id);

        if (!job || job.employer.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }
        await job.remove();
        // Remove the job reference from the employer's profile
        await Profile.updateOne({ user: req.user.id }, { $pull: { jobs: job._id } });
        res.status(200).json({ message: 'Job deleted successfully' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

