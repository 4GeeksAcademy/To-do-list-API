import React, {useState, useEffect} from "react";
import Home from "./home";
import { Trash } from 'react-bootstrap-icons'




const Todo = () => { 
        const [tasks, setTasks] = useState ([]);
        const [ inputValue, setInputValue ] = useState(''); 

        const saveTasks = (e) => {
            if (e.key === "Enter") {
                const updatedTasks = tasks.concat([inputValue]); // Update tasks with the new input value
                setInputValue(""); // Clear the input value
                updateTasksOnServer(updatedTasks); // Update tasks on the server
            }
        };
        
        const removeTasks = (indexToRemove) => {
            const updatedTasks = tasks.filter((_, currentIndex) => currentIndex !== indexToRemove); // Remove the task at the specified index
            updateTasksOnServer(updatedTasks); // Update tasks on the server
        };
        
                const updateTasksOnServer = async (updatedTasks) => {
                    try {
                        const resp = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Dana-M', {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(updatedTasks),
                        });
                        if (!resp.ok) {
                            throw new Error('Failed to update tasks on server');
                        }
                        const data = await resp.json();
                        setTasks(data.map(task => task.label)); // Assuming the label property contains the task text
                        console.log('Tasks updated on the server:', data);
                    } catch (error) {
                        console.log(error);
                    }
                };
                

        
                
        useEffect (() => { 
                 fetch('https://playground.4geeks.com/apis/fake/todos/user/Dana-M', {
                      method: "GET",
                      headers: {
                       "Content-Type": "application/json"
                      }
                   })
                    .then(resp => {
                        console.log(resp.ok); // Will be true if the response is successful
                       console.log(resp.status); // The status code=200 or code=400 etc.
                            console.log(resp.text()); // Will try to return the exact result as a string
                            return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
                        })
                        .then(data => {
                           // Here is where your code should start after the fetch finishes
                            console.log(data); // This will print on the console the exact object received from the server
                            setTasks(data);
                        })
                      .catch(error => {
                            // Error handling
                            console.log(error);
                        })
        })
        
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
                   
                     <li> {item}{item.label}{""} 
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