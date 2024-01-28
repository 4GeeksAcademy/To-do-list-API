import React, {useState, UseEffect} from "react";
import Home from "./home";
import { Trash } from 'react-bootstrap-icons'




const Todo = () => { 
        const [tasks, setTasks] = useState ([]);
        const [ inputValue, setInputValue ] = useState(''); 

        const saveTasks = (e) => {
            if (e.key === "Enter"){
                setTasks (tasks.concat([inputValue]));
                    setInputValue("")
                }}
 
        const removeTasks = (indexToRemove) => {
             setTasks(tasks.filter((_, currentIndex) => currentIndex !== indexToRemove));
                 };
                
    return (
        <div> 
            <ul> 
                <li>
                    <input type="text" onChange={(e) => {setInputValue(e.target.value)}} 
                    value={inputValue} 
                    onKeyDown={saveTasks}
                    placeholder="What's on your mind today?"
                ></input>
                 </li> 
                {tasks.map((item, index) => (
                    <li> {item}{""} 
                    <button onClick={() => removeTasks(index)}>
                        <Trash size={20} /> </button>
                    </li>
                )
                
                )}
                
                </ul> 
            
        </div> 
    )

};


export default Todo;