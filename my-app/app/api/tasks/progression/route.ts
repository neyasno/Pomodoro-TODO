import dbConnect from "@/_server/dbConnect";
import { IUser, User } from "@/_server/models/User";
import { isAuthenticated } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req : NextRequest) {
    try {
        await dbConnect();
  
        const userEmail = await isAuthenticated(req);
        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findOne({email : userEmail})
        const body = await req.json();
        console.log(body)
        const task_id = body.task_id
        console.log("TASK UPDATE1")
        const task = user.tasks.find((task : {_id : string}) => task._id.toString() === task_id) as IUser["tasks"][number];
        task.steps +=1
        console.log("TASK UPDATE2")
        user.save()
  
        return NextResponse.json(user.tasks, { status: 200 });
  
  
    } catch (error) {
        return NextResponse.json({ error: `Fetch error: ${error}` }, { status: 500 });
    }
  }