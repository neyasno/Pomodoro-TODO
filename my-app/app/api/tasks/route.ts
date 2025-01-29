
import dbConnect from "../../../server/dbConnect";
import { User } from "../../../server/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/app/_utils/jwt";

export async function GET(req : NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1] || req.cookies.get("token")?.value; 

    if (!token) {
        return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
    }
    let userEmail = '';
    try {
        const decoded  = jwt.verify(token, JWT_SECRET) as { email: string, iat: number, exp: number };
        userEmail = decoded.email;
        console.log("JWT проверен, вход разрешен.");
        console.log(decoded)
        
    } catch (error) {
        console.error("Ошибка проверки JWT:", error);

        return NextResponse.json({ message: "jwt error" }, { status: 500 });
    }

    const tasks = await User.findOne({email : userEmail})

    console.log(tasks)

    return NextResponse.json(tasks, { status: 200 });


  } catch (error) {
    return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
  }
}

