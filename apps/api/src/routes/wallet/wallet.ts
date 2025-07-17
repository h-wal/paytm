import express from "express";
import {Request, Response, Router} from "express";
import userauth from "../../middlewares/auth";
import { UserModel, WalletModel } from "@db/index";

const walletRouter: Router = express.Router();

walletRouter.get("/profile", userauth, async (req: Request,res: Response): Promise<any> => {
    try{
        const userID = req.user;

        const user = await UserModel.findOne({ _id: userID});
        if (!user){
            return res.status(401).json({
                message: "Unauthorised"
            })
        }

        const wallet = await WalletModel.findOne({
            userId: userID
        })
        if (!wallet){
            return res.status(401).json({
                message: "Wallet not found"
            })
        }

        const balance = wallet.balance
        return res.status(200).json({
            Balance: balance
        })

    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    } 
})
