import { Request, Response, NextFunction } from "express";
import UserModel from "@db/db";

async function userExists(req: Request, res: Response, next: NextFunction) {

    const username = req.body.username;
    const email = req.body.email;

    const userFound = await UserModel.findOne({
        userName: username
    })

    const foundEmail = await UserModel.findOne({
        email: email
    })

    if(userFound){
        res.send({
            "message": "User with this username already Exists"
        });
        return;
    }

    if(foundEmail){
        res.send({
            "message": "User with this email already Exists"
        });
        return;
    }
    
    next();
}

export default userExists;