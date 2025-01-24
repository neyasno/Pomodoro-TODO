import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../server/dbConnect";
import { User } from "../../../server/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Ошибка при получении пользователей: ${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newUser = await User.create(body);
    return NextResponse.json({ message: "Пользователь успешно создан", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Ошибка при создании пользователя: ${error}` }, { status: 500 });
  }
}
