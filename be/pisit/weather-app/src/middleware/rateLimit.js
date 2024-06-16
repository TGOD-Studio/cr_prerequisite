import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    keyGenerator: (req) => {
        return req.cookies.jwt
    },
    handler: (req, res, next) => {
        res.status(429).json({
            msg: "You don't paid yet, you can request as many as you want for only 999$"
        })
    }
})

export default limiter