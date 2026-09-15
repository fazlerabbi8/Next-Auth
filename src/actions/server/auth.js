
"use server"
import bcrypt from 'bcryptjs';
import { dbConnect } from "@/lib/dbConnect";

export const postUser = async (payload) => {
  try {
    const isExist = await dbConnect("users").findOne({ email: payload.email });
    if (isExist) {
      return { success: false, message: "User already exists"};
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = {
      ...payload,
      createdAt: new Date().toISOString(),
      role: "user",
      password: hashedPassword,
    };

    console.log(newUser)

    const result = await dbConnect("users").insertOne(newUser);
    if (result.acknowledged) {
      return { success: true, message: "User created successfully." };
    }

    return { success: false, message: "Failed to create user." };
  } catch (err) {
    console.error("postUser error:", err);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};