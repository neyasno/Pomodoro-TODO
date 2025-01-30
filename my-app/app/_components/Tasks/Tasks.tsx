'use client'

import React, { useEffect, useState } from 'react'


import Task, { TaskProps } from './Task/Task'
import TaskForm from './TaskForm/TaskForm';

const testData : TaskProps[] = [
    {
        title: "Wash house" ,
        text : "Wash house big and cool",
        isActive  : true
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool dasda dasdasda sad asda d asd asd as das dasdasda sda das dasd asdas dsa das as  as dsa das das d ",
        isActive  : true 
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool dasda dasdasda sad asda d asd asd as das dasdasda sda das dasd asdas dsa das as  as dsa das das d ",
        isActive  : false 
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool",
        isActive  : false 
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool",
        isActive  : false 
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool",
        isActive  : false 
    },
    {
        title: "Wash house" ,
        text : "Wash house big and cool",
        isActive  : false 
    },
    
]

export default function Tasks() {

    const [ tasks , setTasks ] = useState<TaskProps[]>([]);
    //const [isLoanding, setIsLoanding] = useState(true);

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


    if(tasks.length){
        return (
            <div className='max-w-max'>
                <TaskForm/>
                <ul className='max-w-max'>
                    {testData.map( (task , index) => <Task text={task.text} title={task.title} isActive={task.isActive} key={index}/>)}
                </ul>
            </div>
        )
    }
    else{
        return (
            <div className='max-w-max'>
                <TaskForm/>
                <p>There is no tasks</p>
            </div>
            
        )
    }
  
}
