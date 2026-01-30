let jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = (req, res, next) => {
    try {
        let token = req.header('auth-token');
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        let data = jwt.verify(token, process.env.JWT_PAS);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            });
        }
        req.user = data.user;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Token error"
        });
    }
}
module.exports = { auth };