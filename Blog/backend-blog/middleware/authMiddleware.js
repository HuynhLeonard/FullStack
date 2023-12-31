import jsonweb from "jsonwebtoken";
import User from "../models/User.js";

export const authGuard = async (req,res,next) => {
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // split bearer word
            const token = req.headers.authorization.split(" ")[1];
            const {id} = jsonweb.verify(token,process.env.JWT_SECRET);
            // not select the password field
            req.user = await User.findById(id).select("-password");
            next();
        } catch (error) {
            let err = new Error("Not authorized, Token failed!");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error("Not authorize, No token!");
        error.statusCode = 401;
        next(error);
    }
}