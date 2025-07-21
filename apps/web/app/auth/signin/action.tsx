"use server"        
import axios from "axios";
import { redirect } from "next/navigation";

    export default async function signInAction(prevState: any, formData: FormData): Promise<{success: boolean, message: string}> {
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email, password)
    
    const response = await axios.post('http://localhost:4173/signin', {
        email,
        password
    })

    if(response){
        redirect("/wallet")
    }
    else{
        return {
            success: false,
            message: "User not signed in"
        }
    }   
}