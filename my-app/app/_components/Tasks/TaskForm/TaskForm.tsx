import React, { useState } from 'react'

export default function TaskForm() {

    const [title , setTitle] = useState("");
    const [text , setText] = useState("");
    const [date , setDate] = useState(new Date());

    const createTask = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        const createTaskRequest = async () => {

            const token = localStorage.getItem("token");

            const newTask = { title , text , date }
            
            const response = await fetch("/api/tasks/" , {
                    method : "POST" ,
                    headers : {"authorization" : `Bearer ${token}`},
                    body : JSON.stringify(newTask)
            });

            if(!response.ok){
                console.log("Error create task!")
            }

            const data = await response.json();
            console.log(data)

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
        <input type="datetime-local" className='border-white p-2  bg-transparent'  placeholder='Data' onChange={e => {
            console.log(setDate(new Date(e.target.value)))
        }} />
        <button className='py-3 px-5 border-white border-2' onClick={createTask}> Create </button>
    </form>
  )
}
