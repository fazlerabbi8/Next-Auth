"use server"
import bcrypt from 'bcryptjs';
import { dbConnect } from "@/lib/dbConnect"

export const postUser = async(payload) =>{
    console.log(payload)

    const isExist = await dbConnect("users").findOne({email: payload});
    if(isExist){
        return {
            success: true,
            message: "user already exist"
        }
    }


    const hashedPassword = await bcrypt.hash(payload.password, 20);

    const newUser = {
        ...payload,
        createdAt: new Date().toISOString(),
        role: "user",
        password: hashedPassword
    }
    console.log(newUser)
}