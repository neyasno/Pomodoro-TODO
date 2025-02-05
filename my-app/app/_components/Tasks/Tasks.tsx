'use client'

import React, { useEffect, useState } from 'react'


import Task, { TaskProps } from './Task/Task'
import TaskForm from './TaskForm/TaskForm';
import fetchApi from '@/utils/fetchApi';
import Button from '../common/Button';
import { useAppSelector } from '@/store/store';
import TextInput from '../common/TextInput';

const sortTasks = (tasks: TaskProps[]) => {
    return tasks.sort((a, b) => {

        if (a.isActive !== b.isActive) {
            return a.isActive ? -1 : 1;
        }
        
        const deadlineA = new Date(a.deadline).getTime();
        const deadlineB = new Date(b.deadline).getTime();
        return deadlineA - deadlineB;

    });
};

export const sortTasksBySteps = (tasks: TaskProps[]): TaskProps[] => {
    return tasks.sort((a, b) => {
        if (a.isActive !== b.isActive) {
            return a.isActive ? -1 : 1;
        }
        return a.steps_amount - b.steps_amount;
    });
};

export const sortTasksInactiveFirst = (tasks: TaskProps[]): TaskProps[] => {
    return tasks.sort((a, b) => {
        if (a.isActive !== b.isActive) {
            return a.isActive ? 1 : -1;
        }
        return 0;
    });
};


function Tasks() {

    const [ tasks , setTasks ] = useState<TaskProps[]>([]);
    const [ allTasks , setAllTasks ] = useState<TaskProps[]>([]);
    const [search_text , setSearchText] = useState("")


    const [formVisability , setFormVisability] = useState(false);
    const currentTask= useAppSelector(state => state.time.currentTask)

    
    useEffect(() => {

        const fetchTasks = async () => {
            let data : TaskProps[] = await fetchApi("/api/tasks/" , "GET")
            data = sortTasks(data)
            setTasks(data);
            setAllTasks(data);
        };

        if(currentTask === ""){
            fetchTasks();
        }
    }, [currentTask]);

    let tasks_content  = <p>There is no tasks</p>

    if(tasks.length){

        tasks_content =   
        <ul className='w-full'>
            {tasks.map( (task , index) => 
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

    const handleSearch = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newTasks = allTasks.filter((item) => item.title.includes(search_text));
        setTasks(newTasks)
    }

    const handleSortTime = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newTasks = sortTasks(allTasks);
        setTasks(newTasks)
    }

    const handleSortSteps = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const newTasks = sortTasksInactiveFirst(allTasks);
        console.log("SORTING:")
        console.log(newTasks)
        
        setTasks(newTasks)
    }

    return (
        <div className='w-full max-w-3xl flex flex-col items-center justify-center gap-2'>
            <div className='flex justify-end w-full px-8 gap-2'>
            <div className='flex gap-2 w-max'>
                    <TextInput value={search_text} placeholder='Search...' handleChange={setSearchText}/>
                    <Button text='Search' handleClick={handleSearch}/>
                </div>
                <Button text='By time' handleClick={handleSortTime}/>
                <Button text='By steps' handleClick={handleSortSteps}/>
            </div>
            <div className='flex justify-between w-full px-8'>
                <div className='flex gap-2'>
                    
                </div>
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