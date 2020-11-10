import { Request, Response, NextFunction } from "express";
import { ErrorHandler, handleError}  from "../../error";
import jwt from "jsonwebtoken";
import config from "config";

const auth_token = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");
    if (!token) {
        const custom = new ErrorHandler(401, "Token not present, authorization denied");
        handleError(custom, req, res);
        return;
    }
    try {
        const decoded: any = jwt.decode(token, config.get("jwt_secret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        const custom = new ErrorHandler(401, "Token is not valid");
        handleError(custom, req, res);
        return;
    }
};

export default auth_token;