import mongoose, { Schema, Document } from "mongoose";

type Task ={
    title : string ,
    text : string , 
    isActive : boolean 
}

interface IUser extends Document {
  email: string;
  password : string;
  tasks : Task[];
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks : {type : String},
    
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
