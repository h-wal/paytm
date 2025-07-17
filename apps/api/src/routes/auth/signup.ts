import express from "express"; 
import { UserModel, WalletModel } from "@db/index";
import bcrypt from "bcrypt";
import { Request, Response, Router, NextFunction } from "express";
import userExists from "../../middlewares/userexists";

const signupRouter: Router = express.Router();

    signupRouter.post('/', userExists, async (req: Request, res: Response) => {
        const username = req.body.username as string;
        const password = req.body.password as string;
        const email = req.body.email as string;

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModel.create({
            userName: username,
            password: hashedPassword,
            email: email
        })

        const walletCreate = await WalletModel.create({
            userId: createUser._id,
            balance: 1000
        })

        if(createUser && walletCreate){
            res.send({
                "message": "User Created"
            })
        } else if(!createUser){
            res.send({
                "error": "User Creation Failed"
            })
        } else if(!walletCreate){
            res.send({
                "error": "Wallet Creation Failed"
            })
        }
    })


export default signupRouter;
    