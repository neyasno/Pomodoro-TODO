'use client'

import { setCurrentTask, startTimer } from '@/store/slices/timeSlice';
import { useAppDispatch } from '@/store/store'
import React, { useMemo } from 'react'
import Button from '../../common/Button';
import StepsIndicator from './components/StepsIndicator';

export type TaskProps = {
    _id : string ,
    title : string , 
    text : string , 
    deadline :  string ,
    isActive : boolean , 
    steps_amount : number , 
    steps : number ,
    setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setDeadline: React.Dispatch<React.SetStateAction<string>>,
    setStepsAmount :  React.Dispatch<React.SetStateAction<number>>,
    setId : React.Dispatch<React.SetStateAction<string>>,
    setChangeFormVisability : React.Dispatch<React.SetStateAction<boolean>>,
    setFormVisability : React.Dispatch<React.SetStateAction<boolean>>,
    changeFormVisability : boolean
}

const calculatePeriod = (deadline : string) =>{
    const thisTime = new Date()
    const deadlineTime =  new Date(deadline);
    const period = deadlineTime.getTime() - thisTime.getTime() 
    return Math.round( period / (1000 * 60 * 60 * 24));  
}

export default function Task({_id ,steps , steps_amount,title , changeFormVisability , text , isActive ,deadline , setFormVisability  , setChangeFormVisability , setId, setTasks ,setDeadline , setStepsAmount ,setText ,setTitle}:TaskProps ) {

    
    const dispatch = useAppDispatch();

    const period = useMemo(() => deadline ? calculatePeriod(deadline) : null, [deadline]);

    const disableTask = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const changeTaskRequest = async () => {

            const token = localStorage.getItem("token");

            console.log("TaskId ==" + _id)
            
            const response = await fetch("/api/tasks/status" , {
                method : "PUT" , 
                headers : { "authorization" : `Bearer ${token}`},
                body : JSON.stringify({ _id })
            });

            if(!response.ok){
                console.log("Error fetching tasks!")
            }

            const data = await response.json();
            setTasks(data)
        };
    
        changeTaskRequest().then((res)=>{
            console.log(res)
        });
    }

    const deleteTask = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const deleteTaskRequest = async () => {

            const token = localStorage.getItem("token");

            console.log("TaskId ==" + _id)
            
            const response = await fetch("/api/tasks/" , {
                method : "DELETE" , 
                headers : { "authorization" : `Bearer ${token}`},
                body : JSON.stringify({ _id })
            });

            if(!response.ok){
                console.log("Error fetching tasks!")
            }

            const data = await response.json();
            setTasks(data)
        };
    
        deleteTaskRequest().then((res)=>{
            console.log(res)            
        });
    }

    const handleStart = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        dispatch(setCurrentTask(_id))
        dispatch(startTimer())
    }

    const handleChange = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
       if(!changeFormVisability){
            setDeadline(deadline)
            setStepsAmount(steps_amount)
            setText(text)
            setTitle(title)
            setId(_id)
            setChangeFormVisability(true)
            setFormVisability(false)
       }
       else{
        setChangeFormVisability(false)
       }
    }
    

    return (
        <li className={`w-full flex p-10 gap-3 transition-all`}>
            <div className='flex items-center justify-center p-5'>
                <div className={`rounded-full size-5 ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`}>

                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-10'>
                <div className='flex flex-col w-full'>
                    <div className='w-full flex justify-between'>
                        <div className='flex gap-2'>
                            <p className='text-2xl'>{title}</p>
                        </div>
                        <StepsIndicator steps={steps} steps_amount={steps_amount} />
                        {isActive && <p>{deadline ? period + " day" : 'No deadline'}</p>}
                        
                    </div>
                    <p>{text}</p>
                </div>
                {isActive && 
                <div className='flex gap-2'>
                    <Button text='Start' handleClick={handleStart}/>
                    <Button text='Change' handleClick={handleChange}/>
                    <Button text='Finish' handleClick={disableTask}/>
                </div>
                }
                {!isActive &&
                <div className='flex gap-2'>
                    <button className='py-2 px-10 border-white border-2' onClick={deleteTask}>Delete</button>
                </div>
                }
            </div>
        </li>
    )
}
