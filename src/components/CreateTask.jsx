import React, { useState } from 'react'

const CreateTask = () => {
    const [newTask, setNewTask] = useState("");
    const [text, setText] = useState("");
    const handlerOnClick = async() => {
        
        try{
            const res = await fetch("http://localhost:3000/Tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: text, done: false
            })
        })
        if(res.ok){
            setText("");
        }
    }catch(error){
        console.log(error)
    }   
    }
  return (
    <div className='flex gap-2 w-full'>
        <input onChange={(e) => setText(e.target.value)} type="text" className='bg-white w-[50%] rounded-lg px-2 py-1 border-white border-2 outline-none focus:border-blue-500 transition-all duration-300'/>
        <button onClick={() => handlerOnClick()} className='bg-blue-500 text-white px-2 py-1 rounded-lg'>Submit</button>
    </div>
  )
}

export default CreateTask