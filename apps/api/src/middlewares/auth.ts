import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export default function userauth(req: Request, res: Response, next: NextFunction){
    const token = req.body.headers;
    const userDetails = jwt.verify(token, "JWT_SECRET", (err: any, decoded: any) => {
        if(err){
            return res.status(401).json({
                error: "Invalid User"
            })
        }
        req.user = decoded;
        
    })

}