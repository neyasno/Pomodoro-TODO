import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './_utils/jwt';


export function middleware(req: NextRequest) {

    console.log("Middleware!!!")

  const token = localStorage.getItem("token");

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = { 
    matcher: "*"
};
