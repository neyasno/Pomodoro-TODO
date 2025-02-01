import React, { useState } from 'react'
import { TaskProps } from '../Task/Task';

export default function TaskForm({setTasks}:{setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>}) {

    const [title , setTitle] = useState("");
    const [text , setText] = useState("");
    const [deadline , setDeadline] = useState("");

    const createTask = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        const createTaskRequest = async () => {

            const token = localStorage.getItem("token");

            const newTask = { title , text , deadline }
            
            const response = await fetch("/api/tasks/" , {
                    method : "POST" ,
                    headers : {"authorization" : `Bearer ${token}`},
                    body : JSON.stringify(newTask)
            });

            if(!response.ok){
                console.log("Error create task!")
            }

            const data = await response.json();
            setTasks(data)

        };
    
        createTaskRequest().then((res)=>{
            console.log(res)
        });
    }

  return (
    <form action="" className='flex flex-col gap-3'>
        <input type="text" className='px-3 py-2 border-2 border-white w-full bg-transparent' value={title} placeholder='Title' 
            onChange={ e => setTitle(e.target.value)}/>
        <input type="text" className='px-3 py-2 border-2 border-white w-full bg-transparent' value={text} placeholder='Text' 
            onChange={ e => setText(e.target.value)}/>
        <div className='flex gap-2 items-center'>
            <p>Deadline : </p>
            <input type="date" className='border-white border-2 p-2  bg-transparent outline-none'  placeholder='Data' onChange={e => {
                console.log(setDeadline(e.target.value))
            }} />
        </div>
        <button className='py-3 px-5 border-white border-2' onClick={createTask}> Create </button>
    </form>
  )
}
