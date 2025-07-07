import express from "express";
import User from "../../packages/db/db";
import mongoose from "mongoose";

async function connecttoDb (){
    try{
        console.log("Connection Request to DB Sent");
        await mongoose.connect("mongodb+srv://paytm.lrmv9kf.mongodb.net/%22%20--apiVersion%201%20--username%2023f3000123%20--password%20harsh");
        console.log("Connection Successfull");
    } catch(e){
        console.error("Connection Failed:", e.message);
    }  
}

connecttoDb()

const app = express()
const port = 4173

app.get('/signin', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})