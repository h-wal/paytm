"use server";

import { redirect } from "next/navigation";
import userModel from "../../packages/db/db.ts"

export async function signup(formData: FormData){
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    if (!name || !email || !password ) {
        throw new Error("All fields are required");
    }

}