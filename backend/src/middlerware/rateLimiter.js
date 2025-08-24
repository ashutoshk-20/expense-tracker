import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const userId = req.body?.user_id || req.params?.userId || req.params?.id || req.ip;
        console.log("Rate limiting for user:", userId);
        const { success } = await ratelimit.limit(`rate-limit-${userId}`);

        if (!success){
            return res.status(429).json({error: "Too many requests, please try again later."});
        }

        next();

    } catch (error) {
        console.error("Rate limiting error:", error);
        next(error);
    }
};

export default rateLimiter;