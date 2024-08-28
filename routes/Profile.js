const express = require("express")
const authmiddleware = require('../middlewares/authmiddleware')
const upload = require('../middlewares/upload')
// const rateLimiterMiddleware = require('../middlewares/ratelimiter');
const {updateprofile,uploadresume} = require('../controllers/Profile')


const router = express.Router();

router.post('/edit-profile',authmiddleware,updateprofile);
router.post('/upload-resume',authmiddleware,upload.single('resume'),uploadresume);

module.exports = router