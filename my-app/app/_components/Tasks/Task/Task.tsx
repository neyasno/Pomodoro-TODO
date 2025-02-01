'use client'

import { startTimer } from '@/store/slices/timeSlice';
import { useAppDispatch } from '@/store/store'
import React, { useMemo } from 'react'

export type TaskProps = {
    _id : string ,
    title : string , 
    text : string , 
    deadline :  string ,
    isActive : boolean , 
    setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>
}

const calculatePeriod = (deadline : string) =>{
    const thisTime = new Date()
    const deadlineTime =  new Date(deadline);
    const period = deadlineTime.getTime() - thisTime.getTime() 
    return Math.round( period / (1000 * 60 * 60 * 24));  
}

export default function Task({_id ,title , text , isActive ,deadline , setTasks}:TaskProps ) {
    const dispatch = useAppDispatch();

    const period = useMemo(() => deadline ? calculatePeriod(deadline) : null, [deadline]);

    const disableTask = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const changeTaskRequest = async () => {

            const token = localStorage.getItem("token");

            console.log("TaskId ==" + _id)
            
            const response = await fetch("/api/tasks/" , {
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
        dispatch(startTimer())
    }

    return (
        <li className=' w-full flex p-10 gap-3'>
            <div className='flex items-center justify-center p-5'>
                <div className={`rounded-full size-5 ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`}>

                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-10'>
                <div className='flex flex-col w-full'>
                    <div className='w-full flex justify-between'>
                        <p className='text-2xl'>{title}</p>
                        {isActive && <p>{deadline ? period + " day" : 'No deadline'}</p>}
                    </div>
                    <p>{text}</p>
                </div>
                {isActive && 
                <div className='flex gap-2'>
                    <button className='py-2 px-10 border-white border-2'onClick={handleStart}>Start</button>
                    <button className='py-2 px-10 border-white border-2' onClick={disableTask}>Close</button>
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
