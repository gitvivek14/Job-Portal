const express = require("express")
const {login,register} = require("../controllers/Auth")

const authmiddleware = require('../middlewares/authmiddleware')
const rateLimiterMiddleware = require('../middlewares/ratelimiter');



const router = express.Router();

router.post('/signup',register);
router.post('/login',rateLimiterMiddleware,login);

module.exports = router

