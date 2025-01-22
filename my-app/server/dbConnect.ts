import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/mydatabase";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Подключение к базе данных уже установлено");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.error("Ошибка подключения к базе данных:", error);
    process.exit(1);
  }
};

export default dbConnect;
