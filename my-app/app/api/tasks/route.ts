
import { isAuthenticated } from "@/utils/jwt";
import dbConnect from "../../../_server/dbConnect";
import { IUser, User } from "../../../_server/models/User";
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
            deadline : body.deadline,
            isActive : true
        }
        user.tasks.push(newTask)
        user.save()

        return NextResponse.json(user.tasks, { status: 200 });

  
    } catch (error) {
        return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
    }
}

export async function PUT(req : NextRequest) {
  try {
      await dbConnect();

      const userEmail = await isAuthenticated(req);
      if (!userEmail) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const user = await User.findOne({email : userEmail})
      const body = await req.json();
      const task_id = body._id
    
      const task = user.tasks.find((task : {_id : string}) => task._id.toString() === task_id) as IUser["tasks"][number];
      task.isActive = false
      user.save()

      return NextResponse.json(user.tasks, { status: 200 });


  } catch (error) {
      return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
  }
}

export async function DELETE(req : NextRequest) {
    try {
        await dbConnect();
  
        const userEmail = await isAuthenticated(req);
        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
  
        const user = await User.findOne({email : userEmail})
        const body = await req.json();
        const task_id = body._id
        
        user.tasks = user.tasks.filter((task : {_id:string}) => task._id.toString() !== task_id)
        user.save()
  
        return NextResponse.json(user.tasks, { status: 200 });
  
  
    } catch (error) {
        return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
    }
  }



