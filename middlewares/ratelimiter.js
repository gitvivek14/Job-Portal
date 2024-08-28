const rateLimit = require('rate-limiter-flexible');
const { RateLimiterMemory } = rateLimit;
const limiter = new RateLimiterMemory({
    points: 5, // 5 attempts
    duration: 60, // per minute
});

const rateLimiterMiddleware = (req, res, next) => {
    limiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too many requests, please try again later.' });
        });
};

module.exports = rateLimiterMiddleware;