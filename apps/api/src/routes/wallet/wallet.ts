import express from "express";
import {Request, Response, Router} from "express";
import userauth from "../../middlewares/auth";
import { UserModel, WalletModel } from "@db/index";

const walletRouter: Router = express.Router();

walletRouter.get("/profile", userauth, async (req: Request, res: Response): Promise<void> => {
    try {
        const userID = req.user;

        const user = await UserModel.findOne({ _id: userID });
        if (!user) {
            res.status(401).json({ message: "Unauthorised" });
            return;
        }

        const wallet = await WalletModel.findOne({ userId: userID });
        if (!wallet) {
            res.status(401).json({ message: "Wallet not found" });
            return;
        }

        const balance = wallet.balance;
        res.status(200).json({ Balance: balance });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default walletRouter;