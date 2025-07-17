import express from "express"; 
import { UserModel } from "@db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

const signinRouter: Router = express.Router();

async function signinrequest(req: Request, res: Response){
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const userFound = await UserModel.findOne({
        userName: username
    })

    if (userFound){
        const hash = userFound.password as string;

        const usercheck = await bcrypt.compare(password, hash);

        if(usercheck){
            const userId = userFound._id;
            const token = await jwt.sign({
                "userId": userId
            }, "JWT_SECCRET")
            res.send({
                "token": token
            })
        } else {
            res.send({
                "message": "Invalid Credentials"
            })
        }
    }
    if (!userFound) {
        res.send({ "message": "User not found" });
        return;
    }
}

signinRouter.post('/', signinrequest)

export default signinRouter
    