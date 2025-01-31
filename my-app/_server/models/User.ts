import mongoose, { Schema, Document } from "mongoose";

type Task ={
    title : string ,
    text : string , 
    deadline : Date ,
    isActive : boolean 
}

interface IUser extends Document {
  email: string;
  password : string;
  tasks : Task[];
}

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  isActive: { type: Boolean, default: true } , 
  deadline : { type : Date },
});

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks : {type : [TaskSchema] , default : [] },
    
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
