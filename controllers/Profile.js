const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { z } = require('zod');
const Profile = require("../models/Profile");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;  // Use cloudinary v2


const uploadimage = async (file , folder)=>{
    const options = {folder}
    // if(height){
    //     options.height=height;
    // }
    // if(quality){
    //     options.quality=quality
    // }
    options.resourcs_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

const userProfileSchema = z.object({
    resume: z.string().optional(),
    education: z.array(
        z.object({
            school: z.string().optional(),
            degree: z.string().optional(),
            fieldOfStudy: z.string().optional(),
            startDate: z.string().transform(str => new Date(str)).optional(),  // Convert string to Date
            endDate: z.string().transform(str => new Date(str)).optional()     // Convert string to Date
        })
    ).optional(),
    experience: z.array(
        z.object({
            company: z.string().optional(),
            title: z.string().optional(),
            startDate: z.string().transform(str => new Date(str)).optional(),  // Convert string to Date
            endDate: z.string().transform(str => new Date(str)).optional(),    // Convert string to Date
            description: z.string().optional()
        })
    ).optional(),
    projects: z.array(
        z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            link: z.string().url().optional()
        })
    ).optional()
});

const employerProfileSchema = z.object({
    companyName: z.string().optional(),
    website: z.string().url().optional(),
    location: z.string().optional(),
    jobs: z.array(z.string().optional()).optional()  // Assuming jobs are represented by IDs
});

const profileUpdateSchema = z.object({
    data: z.union([userProfileSchema, employerProfileSchema])
});

exports.updateprofile = async (req, res) => {
    try {
        // console.log('Request Body:', req.body);

        // const fields = profileUpdateSchema.parse({
        //     data: req.body.data
        // });
        const { resume, education, experience, projects, companyName, website, location, jobs } = req.body;

        // const { data } = fields;

        // console.log('Parsed Data:', data);

        console.log("resumem",resume)

        const userId = req.user.id;
        const user = await User.findById(userId);
        const accountType = user.accounttype;

        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (accountType === 'User') {
            profile.resume = resume || profile.resume;
            profile.education = education || profile.education;
            profile.experience = experience || profile.experience;
            profile.projects = projects || profile.projects;
        } else if (accountType === 'Employer') {
            profile.companyName = companyName || profile.companyName;
            profile.website = website || profile.website;
            profile.location = location || profile.location;
            profile.jobs = jobs || profile.jobs;
        }
        await profile.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            profile
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

exports.uploadresume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log("pri file",req.file)

     

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'raw', format: 'pdf' },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: 'Cloudinary upload failed' });
                }

                const userId = req.user.id;
                const profile = await Profile.findOne({ user: userId });

                if (!profile) {
                    return res.status(404).json({ message: 'Profile not found' });
                }
                console.log("result url ",result.secure_url)
                profile.resume = result.secure_url;
                await profile.save();
                return res.status(200).json({
                    success: true,
                    message: 'Resume uploaded successfully',
                    resume: result.secure_url
                });
            }
        );
        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}
