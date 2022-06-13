const { rateLimit } = require('express-rate-limit');


exports.requestLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10,
  message: {
    success: false,
    message: "You have exceeded the 10 requests in minute limit!",
    }, 
  headers: true,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

