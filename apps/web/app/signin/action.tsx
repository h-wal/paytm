"use server"        
import axios from "axios";
import { redirect } from "next/navigation";

    export default async function signInAction(formData: FormData){
    const username = formData.get('username');
    const password = formData.get('password');

    const response = await axios.post('http://localhost:4000/signin', {
        username,
        password
    })
    if(response.status === 200){
        return {
            success: true,
            message: "User signed in successfully"
        }
        redirect("/wallet")
    }
    else{
        return {
            success: false,
            message: "User not signed in"
        }
        redirect("/signin")
    }   
}