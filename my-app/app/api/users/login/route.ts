
import { generateToken } from "@/utils/jwt";
import dbConnect from "../../../../_server/dbConnect";
import { User } from "../../../../_server/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const existingUser = await User.findOne({ email: body.email , password : body.password });
    if(existingUser){
      console.log("User exist")
      return NextResponse.json({ message: "Success" , token : await generateToken({ email: body.email } ,"2 h") }, { status: 200 });
    }
    else{
        console.log("User not exist")
        return NextResponse.json({ message: "User not exist" }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({ error: `Login error: ${error}` }, { status: 500 });
  }
}
