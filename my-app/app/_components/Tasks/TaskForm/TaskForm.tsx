import React, { useState } from 'react'
import { TaskProps } from '../Task/Task';
import fetchApi from '@/utils/fetchApi';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import DeadlineInput from './components/DeadlineInput';
import StepsInput from './components/StepsInput';

export default function TaskForm({setTasks}:{setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>}) {

    const [title , setTitle] = useState("");
    const [text , setText] = useState("");
    const [deadline , setDeadline] = useState("");
    const [steps_amount , setStepsAmount] = useState(0);

    const createTask = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        const createTaskRequest = async () => {

            const newTask = { title , text , deadline , steps_amount }
            
            const data = await fetchApi("/api/tasks/" , "POST" , newTask);
            setTasks(data)

        };
    
        createTaskRequest().then((res)=>{
            console.log(res)
        });
    }

  return (
    <form action="" className='flex flex-col gap-3'>
        <TextInput value={title} placeholder='Title' handleChange={setTitle}/>
        <TextInput value={text} placeholder='Text' handleChange={setText}/>
        <DeadlineInput setDeadline={setDeadline}/>
        <StepsInput value={steps_amount} handleChange={setStepsAmount}/>
        <Button text='Create' handleClick={createTask}/>
    </form>
  )
}
