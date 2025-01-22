import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../server/dbConnect";
import { User } from "../../../server/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: `Ошибка при получении данных ${error}` });
    }
  } else {
    res.status(405).json({ error: "Метод не поддерживается" });
  }
  
  if(req.method === "POST"){
    try {
        await User.create(req.body);
        res.status(200);
      } catch (error) {
        res.status(500).json({ error: `Ошибка при создании данных ${error}` });
      }
  }
}
