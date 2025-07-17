import mongoose from "mongoose";

export default async function connecttoDb (){
    try{
        console.log("Connection Request to DB Sent");
        await mongoose.connect("mongodb+srv://23f3000123:harsh@paytm.lrmv9kf.mongodb.net/");
        console.log("Connection Successfull");
    } catch(e: any){
        console.error("Connection Failed:", e.message);
    }  
}