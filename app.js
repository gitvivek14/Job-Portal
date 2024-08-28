const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDb = require('./config/db')
const fileupload = require("express-fileupload")

dotenv.config()

require('./config/cloudinary').cloudconnect()

connectDb();

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(fileupload({
//     useTempFiles:true,
//     tempFileDir:"./temp"
// }))

// app.use(helmet());

const Userroutes = require("./routes/User")
const Profileroutes = require("./routes/Profile")
const Applicationroutes = require("./routes/Application")
const Jobroutes = require("./routes/Job")
app.use("/api/v1/auth",Userroutes);
app.use("/api/v1/user",Profileroutes);
app.use("/api/v1/application",Applicationroutes);
app.use("/api/v1/job",Jobroutes);

module.exports = app;