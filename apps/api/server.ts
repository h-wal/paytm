import express from "express";
import UserModel from "../../packages/db/db";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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

async function userExists(req, res, next) {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const userFound = await UserModel.findOne({
        userName: username
    })

    if(userFound){
        res.send({
            "message": "User with this username already Exists"
        })
    }

    const foundEmail = await UserModel.findOne({
        email: username
    })

    if(foundEmail){
        res.send({
            "message": "User with this email already Exists"
        })
    }

    next();
}

app.post('/signup', userExists, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await UserModel.create({
        userName: username,
        password: hashedPassword,
        email: email
    })

    if(createUser){
        res.send({
            "message": "User Created"
        })
    } else{
        res.send({
            "error": createUser
        })
    }
})

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const userFound = await UserModel.findOne({
        userName: username
    })

    if (userFound){
        const hash = userFound.password;

        const usercheck = await bcrypt.compare(password, hash);

        if(usercheck){
            const username = userFound.userName;
            const token = await jwt.sign(username, "JWT_SECCRET")
            res.send({
                "token": token
            })
        } else {
            res.send({
                "message": "Invalid Credentials"
            })
        }
    }
    const unhashedPassword = await bcrypt.sign(password, 10);

    const createUser = await UserModel.create({
        userName: username,
        password: hashedPassword,
        email: email
    })

    if(createUser){
        res.send({
            "message": "User Created"
        })
    } else{
        res.send({
            "error": createUser
        })
    }
})
})

app.get('/profile', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})