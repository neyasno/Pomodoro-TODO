'use client'

import React, { useEffect, useMemo, useState } from 'react'


import Task, { TaskProps } from './Task/Task'
import TaskForm from './TaskForm/TaskForm';
import fetchApi from '@/utils/fetchApi';
import Button from '../common/Button';
import { useAppSelector } from '@/store/store';

function Tasks() {

    const [ tasks , setTasks ] = useState<TaskProps[]>([]);
    const [formVisability , setFormVisability] = useState(false);
    const currentTask= useAppSelector(state => state.time.currentTask)

    const fetchTasks = async () => {
        const data : TaskProps[] = await fetchApi("/api/tasks/" , "GET")
        setTasks(data);
    };
    useEffect(() => {
        if(currentTask === ""){
            fetchTasks();
        }
    }, [currentTask]);

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => Number(a.deadline!) - Number(b.deadline!));
      }, [tasks]);

    let tasks_content  = <p>There is no tasks</p>
    if(tasks.length){

        tasks_content =   
        <ul className='w-full'>
            {sortedTasks.map( (task , index) => 
                <Task _id={task._id} 
                      text={task.text} 
                      title={task.title} 
                      isActive={task.isActive} 
                      deadline={task.deadline} 
                      key={index}
                      setTasks={setTasks}
                      steps_amount={task.steps_amount}
                      steps={task.steps}
                      />
            )}
        </ul>

    }

    return (
        <div className='w-full max-w-3xl flex flex-col items-center justify-center gap-2'>
            <div className='flex justify-between w-full px-8'>
                <div></div>
                <Button handleClick={() => setFormVisability(!formVisability)} text={formVisability ? "Close" : "Add task"}/>
            </div>
            <div className={`flex overflow-hidden transition-all duration-500 ${formVisability ? "h-72" : "h-0"}`}>
                <TaskForm setTasks={setTasks}/>
            </div>

            {tasks_content}

        </div>  
    )
  
}

export default React.memo(Tasks)