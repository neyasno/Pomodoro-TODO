import React from 'react'
import { TaskProps } from '../Task/Task';
import fetchApi from '@/utils/fetchApi';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';
import DeadlineInput from './components/DeadlineInput';
import StepsInput from './components/StepsInput';

type TChangeTaskForm = {
    setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>
    title : string
    text : string
    deadline : string
    steps_amount : number
    _id : string
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setText: React.Dispatch<React.SetStateAction<string>>
    setDeadline: React.Dispatch<React.SetStateAction<string>>
    setStepsAmount :  React.Dispatch<React.SetStateAction<number>>
}

export default function ChangeTaskForm({setTasks ,_id ,  deadline ,steps_amount ,text ,title , setDeadline ,setStepsAmount ,setText ,setTitle}:TChangeTaskForm) {

    const changeTask = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        const createTaskRequest = async () => {

            const newTask = { title , text , deadline , steps_amount , _id }
            
            const data = await fetchApi("/api/tasks/" , "PUT" , newTask);
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
        <Button text='Change' handleClick={changeTask}/>
    </form>
  )
}
