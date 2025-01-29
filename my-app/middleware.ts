import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "./app/_utils/jwt";
import jwt from "jsonwebtoken"

export const runtime = "nodejs";

export function middleware(req: NextRequest) {

    console.log("Middleware!!!")

    const token = req.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // try {
  //   jwt.verify(token, JWT_SECRET);
  //   return NextResponse.next();
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
}

export const config = { 
    matcher: "/"
};
