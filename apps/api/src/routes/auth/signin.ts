import express from "express"; 
import { UserModel } from "@db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

const signinRouter: Router = express.Router();

async function signinrequest(req: Request, res: Response){
    const email = req.body.email;
    const password = req.body.password;

    const userFound = await UserModel.findOne({
        email: email
    })

    if (userFound){
        const hash = userFound.password as string;

        const usercheck = await bcrypt.compare(password, hash);

        if(usercheck){
            const userId = userFound._id;
            const token = jwt.sign({
                "userId": userId
            }, "JWT_SECCRET")
            res.status(200).send({
                "token": token
            })
        } else {
            res.status(401).send({
                "message": "Invalid Credentials"
            })
        }
    }
    if (!userFound) {
        res.status(401).send({ "message": "User not found" });
        return;
    }
}

signinRouter.post('/', signinrequest)

export default signinRouter
    