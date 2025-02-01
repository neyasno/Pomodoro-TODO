
import { isAuthenticated } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userEmail = await isAuthenticated(req);
    if(userEmail){
      console.log("Token verified")
      return NextResponse.json({ message : "Success"}, { status: 200 });
    }
    
    console.log("Token not verified")
    return NextResponse.json({ error: `Verification error!` }, { status: 500 });

  } catch (error) {
    console.log("Token not verified")
    return NextResponse.json({ error: `Verification error: ${error}` }, { status: 500 });
  }
}