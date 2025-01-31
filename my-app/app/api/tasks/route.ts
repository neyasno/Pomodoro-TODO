
import { isAuthenticated } from "@/_server/utils/jwt";
import dbConnect from "../../../_server/dbConnect";
import { User } from "../../../_server/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
  try {
    await dbConnect();

    const userEmail = await isAuthenticated(req);
    console.log(userEmail)
    if(userEmail){
        const user = await User.findOne({email : userEmail})
        console.log(user.tasks)
        return NextResponse.json(user.tasks, { status: 200 });
    } 
    else{
        console.error("Error JWT!");
        return NextResponse.json({ message: "jwt error" }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
  }
}

export async function POST(req : NextRequest) {
    try {
        await dbConnect();

        const userEmail = await isAuthenticated(req);
        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({email : userEmail})
        const body = await req.json();
        
        const newTask = {
            title : body.title,
            text : body.text,
            deadline : body.date,
            isActive : true
        }
        user.tasks.push(newTask)
        user.save()

        return NextResponse.json(user.tasks, { status: 200 });

  
    } catch (error) {
        return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
    }
  }

