'use client'

import React, { useEffect } from 'react'


import Task, { TaskProps } from './Task/Task'

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

    useEffect(() => {
        const fetchUsers = async () => {
            const userData = {
                email:"sdadadadsad",
                password : "adadsada" , 
            }
            
            await fetch("/api/users/index" , {method : "POST" , body : JSON.stringify(userData)});
        };
    
        fetchUsers();
        }, []);

  return (
    <ul className='max-w-max'>
        {testData.map( (task , index) => <Task text={task.text} title={task.title} isActive={task.isActive} key={index}/>)}
    </ul>
  )
}
