import { createSlice } from "@reduxjs/toolkit";

type Task ={
    title : string ,
    text : string , 
    isActive : boolean 
}

type User = {
    email: string;
    password : string;
    tasks : Task[];
    isLogined : boolean
}

const initialState : User = {
    email : "" ,
    password : "" ,
    tasks : [] ,
    isLogined : false , 
}

const userSlice = createSlice({
    name : "user" ,
    initialState: initialState ,
    reducers : {
        changeIsLogined : (state) => {
            state.isLogined = !state.isLogined
        },
        setTasks : (state , action) =>{
            state.tasks = action.payload
        }
    }
})

export const { changeIsLogined , setTasks } = userSlice.actions;
export default userSlice.reducer;