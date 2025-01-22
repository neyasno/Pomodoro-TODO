import { createSlice } from "@reduxjs/toolkit";

type time = {
    time : string,
    minutes : number , 
    seconds : number , 
    isActive : boolean
}

const initialState : time = {
    time : "25:00" ,
    minutes : 25 , 
    seconds : 0 , 
    isActive : false
}

const timeSlice = createSlice({
    name : "time" ,
    initialState: initialState ,
    reducers : {
        startTimer : (state) =>{
            state.isActive = true
        },
        stopTimer : (state) =>{
            state.isActive = false
        },
        tick : (state) =>{
            if(state.seconds !==0){
                state.seconds -=1
                state.time = state.minutes + ":" + ((state.seconds + "").length === 2 ? state.seconds : '0'+ state.seconds )
            }
            else{
                if(state.minutes !==0){
                    state.minutes -=1
                    state.seconds = 59
                    state.time = state.minutes + ":" + ((state.seconds + "").length === 2 ? state.seconds : '0'+ state.seconds )
                }
                else{
                    state.isActive = false
                    state.minutes = 25
                    state.seconds = 0
                    state.time = state.minutes + ":" + ((state.seconds + "").length === 2 ? state.seconds : '0'+ state.seconds )
                }
            }
        }, 
        resetTimer : (state) =>{
            state.minutes = 25
            state.seconds = 0
            state.time = "25:00"
        }
    }
})

export const { startTimer , tick ,resetTimer , stopTimer } = timeSlice.actions;
export default timeSlice.reducer;