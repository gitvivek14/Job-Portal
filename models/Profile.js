const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    accounttype: {
      type: String,
      enum: ["User", "Employer"],
      required: true,
    },

    // Fields for users (job seekers)
    resume: { type: String },
    education: [
      {
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    experience: [
      {
        company: String,
        title: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        link: String,
      },
    ],

    // Fields for employers
    companyName: { type: String }, // Only for employers
    website: { type: String }, // Only for employers
    location: { type: String }, // Can be used by both users and employers
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Only for employers
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile',ProfileSchema);
