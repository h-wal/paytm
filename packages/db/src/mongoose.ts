import mongoose from "mongoose";

export default async function connecttoDb (){
    try{
        console.log("Connection Request to DB Sent");
        await mongoose.connect("mongodb://admin:admin123@localhost:27017");
        console.log("Connection Successfull");
    } catch(e: any){
        console.error("Connection Failed:", e.message);
    }  
}