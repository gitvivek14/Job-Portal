const express = require("express")
const authmiddleware = require('../middlewares/authmiddleware')
const upload = require('../middlewares/upload')

const {createjob,deletejob,editjob,getalljobs,getjobbyid} = require("../controllers/Job")



const router = express.Router();

router.get('/getjobs',authmiddleware,getalljobs);
router.post('/create-job',authmiddleware,createjob);
router.post('/delete-job',authmiddleware,deletejob);
router.post('/edit-job',authmiddleware,editjob);
router.post('/getjob-byid',authmiddleware,getjobbyid);


module.exports = router