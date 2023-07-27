import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { username, email, password } = await request.json();
  await connect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User Created", {
      status: 200,
    });
  } catch (err) {
    if (err?.code === 11000) {
      return new NextResponse("Duplicate", {
        status: 400,
      });
    }
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
