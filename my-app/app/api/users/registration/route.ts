
import dbConnect from "@/_server/dbConnect";
import { User } from "@/_server/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const existingUser = await User.findOne({ email: body.email });
    if(existingUser){
      console.log("User exist")
      return NextResponse.json({ error: `User exist`}, { status: 500 });
    }

    const newUser = await User.create(body);
    return NextResponse.json({ message: "Creation success", user: newUser }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: `Creation error: ${error}` }, { status: 500 });
  }
}
