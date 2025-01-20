const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const cookieParser = require("cookie-parser"); // Ensure cookie-parser is installed and used in your app

// Middleware for checking if the user is authenticated
const protectRoute = async (req, res, next) => {
    const secret = process.env.JWT_SECRET || "Dii678@"; // Use environment variable for secret
    try {
        // Ensure cookies are parsed in the request
        const token = req.cookies.jwt; // Correct way to access cookies
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        // Find user from the decoded token's ID
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user to request object for use in next middleware/route
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = protectRoute;
