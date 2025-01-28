
import { generateToken, verifyToken } from "@/app/_utils/jwt";
import dbConnect from "../../../../server/dbConnect";
import { User } from "../../../../server/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const existingUser = await User.findOne({ email: body.email , password : body.password });
    if(existingUser){
      console.log("User exist")
      return NextResponse.json({ message: "Success" , token : generateToken({ email: body.email }) }, { status: 200 });
    }
    else{
        console.log("User not exist")
        return NextResponse.json({ message: "User not exist" }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({ error: `Login error: ${error}` }, { status: 500 });
  }
}

export async function GET(req : Request){
  try{
    const body = await req.json();
    verifyToken(body['token']);
  }
  catch(error){
    return NextResponse.json({ error: `Verification error: ${error}` }, { status: 500 });
  }
}
