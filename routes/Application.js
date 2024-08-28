const express = require("express")
const authmiddleware = require('../middlewares/authmiddleware')
const upload = require('../middlewares/upload')

const {getapplications,updateapplication} = require("../controllers/Application")



const router = express.Router();

router.get('/getallapplications',authmiddleware,getapplications);
router.post('/update-application',authmiddleware,updateapplication);


module.exports = router