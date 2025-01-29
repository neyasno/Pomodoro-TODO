
import { verifyToken } from "@/app/_utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    verifyToken(body['token']);
    console.log("Token verified")
    return NextResponse.json({ message : "Success"}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: `Verification error: ${error}` }, { status: 500 });
  }
}