import express from "express";
import mongoose from "mongoose";    
import signinRouter from "./routes/auth/signin"
import signupRouter from "./routes/auth/signup"
import walletRouter from "./routes/wallet/wallet"
import TransactionRouter from "./routes/transactions/transacion";
async function connecttoDb (){
    try{
        console.log("Connection Request to DB Sent");
        await mongoose.connect("mongodb+srv://23f3000123:harsh@paytm.lrmv9kf.mongodb.net/");
        console.log("Connection Successfull");
    } catch(e: any){
        console.error("Connection Failed:", e.message);
    }  
}

connecttoDb()
const app = express()
const port = 4173

app.use(express.json());

app.use("/signin", signinRouter)
app.use("/signup", signupRouter)
app.use("/wallet", walletRouter)
app.use("/transactions", TransactionRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})