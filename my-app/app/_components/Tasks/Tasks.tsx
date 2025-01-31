'use client'

import React, { useEffect, useState } from 'react'


import Task, { TaskProps } from './Task/Task'
import TaskForm from './TaskForm/TaskForm';

export default function Tasks() {

    const [ tasks , setTasks ] = useState<TaskProps[]>([]);
    const [formVisability , setFormVisability] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {

            const token = localStorage.getItem("token");
            
            const response = await fetch("/api/tasks/" , {method : "GET" , headers : {
                "authorization" : `Bearer ${token}`
            }});
            console.log()

            if(!response.ok){
                console.log("Error fetching tasks!")
            }

            const data = await response.json();
            console.log(data)
            setTasks(data);

        };
    
        fetchTasks().then((res)=>{
            console.log(res)
        });
    }, []);

    let content  = <p>There is no tasks</p>
    if(tasks.length){

        content =   
        <ul className='w-max'>
            {tasks.map( (task , index) => <Task text={task.text} title={task.title} isActive={task.isActive} deadline={task.deadline} key={index}/>)}
        </ul>

    }

    return (
        <div className='w-full max-w-3xl flex flex-col items-center justify-center gap-2'>
            <div className='flex justify-between w-full px-8'>
                <div></div>
                <button 
                    className='py-2 px-4 border-2 border-white w-max' 
                    onClick={() => setFormVisability(!formVisability)}>{formVisability ? <p>Close</p> : <p>Add task</p>}
                </button>
            </div>
            <div className={`flex overflow-hidden transition-all duration-500 ${formVisability ? "h-56" : "h-0"}`}><TaskForm/></div>
            {content}
        </div>  
    )
  
}
