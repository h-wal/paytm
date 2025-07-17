import { UserModel, WalletModel } from "@db/index";
import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";

export const TransactionRouter: Router = express.Router();

TransactionRouter.post("/", async (req: Request,res: Response) => {

    const to = req.body.to;
    const from = req.body.from;
    const amount = req.body.amount;

    const session = await mongoose.startSession();

    try{

        await session.withTransaction(async() => {

            const toUser = await UserModel.findOne({ username: to }).session(session);
            if(!toUser){
                res.status(401).json({
                    message: "To User Does Not Exist"
                })
                return;
            }
            const ToUserId = toUser._id

            const fromUser = await UserModel.findOne({ username: from}).session(session);
            if(!fromUser){
                res.send(401).json({
                    message: "From User Does Not Exist"
                })
                return;
            }

            const FromUserId = fromUser._id

            const ToWallet = await WalletModel.findOne({userId: ToUserId}).session(session);
            const FromWallet = await WalletModel.findOne({userId: FromUserId}).session(session);

            if (!ToWallet || !FromWallet) {
                res.status(401).json({
                    message: "Wallets Not Found"
                })
                throw new Error("wallets missing")
                return;
            }
            //@ts-ignore
            if(FromWallet.balance < amount){
                res.json({
                    message: "Insuffiecient Balance"
                })
                return;
            }

            //@ts-ignore
            FromWallet.balance -= amount;
            ToWallet.balance += amount;

            await FromWallet.save({ session });
            await ToWallet.save({ session });
        })

        res.status(200).json({ message: "Transaction successful" });

    } catch(e){
            console.log(e);
            res.json({
                message: "Servor error"
            })
        }finally {
    session.endSession();
  }
})

export default TransactionRouter;