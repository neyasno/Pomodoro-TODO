import { createSlice } from "@reduxjs/toolkit";

export enum ETimerStates{
    WORKING,
    RESTING,
    STOP
}

type time = {
    time : string,
    minutes : number , 
    seconds : number , 
    rest_time : string ,
    rest_minutes : number ,
    rest_seconds : number ,
    timerState : ETimerStates
}

const initialState : time = {
    time : "0:05" ,
    minutes : 0 , 
    seconds : 5 ,
    rest_time : '0:03' ,
    rest_minutes : 0 ,
    rest_seconds : 3 ,
    timerState : ETimerStates.STOP
}

const timeSlice = createSlice({
    name : "time" ,
    initialState: initialState ,
    reducers : {
        startTimer : (state) =>{
            if(state.time==initialState.rest_time){
                state.timerState = ETimerStates.RESTING 
            }
            else{
                state.timerState = ETimerStates.WORKING 
            }
        },
        stopTimer : (state) =>{
            state.timerState = ETimerStates.STOP
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
                    if(state.timerState == ETimerStates.WORKING){
                        state.minutes = initialState.rest_minutes
                        state.seconds = initialState.rest_seconds
                        state.timerState = ETimerStates.STOP
                        state.time = state.minutes + ":" + ((state.seconds + "").length === 2 ? state.seconds : '0'+ state.seconds )
                    }
                    else if (state.timerState == ETimerStates.RESTING){
                        state.minutes = initialState.minutes
                        state.seconds = initialState.seconds
                        state.timerState = ETimerStates.STOP
                        state.time = state.minutes + ":" + ((state.seconds + "").length === 2 ? state.seconds : '0'+ state.seconds )
                    } 
                }
            }
        }, 
    }
})

export const { startTimer , tick , stopTimer } = timeSlice.actions;
export default timeSlice.reducer;