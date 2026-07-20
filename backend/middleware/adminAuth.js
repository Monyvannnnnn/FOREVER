import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const jwtSecret = process.env.JWT_SECRET || 'greatstack';
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vacci.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

        const token_decode = jwt.verify(token, jwtSecret);
        if (token_decode !== adminEmail + adminPassword) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Unauthorized" });
    }
}

export default adminAuth;