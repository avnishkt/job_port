import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        console.log(1);
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };
        req.id = decode.userId;
        console.log(req.id)
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;