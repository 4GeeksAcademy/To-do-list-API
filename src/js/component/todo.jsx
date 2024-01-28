import React, {useState, useEffect} from "react";
import Home from "./home";
import { Trash } from 'react-bootstrap-icons'




const Todo = () => { 
        const [tasks, setTasks] = useState ([]);
        const [ inputValue, setInputValue ] = useState(''); 

        const saveTasks = (e) => {
            if (e.key === "Enter"){
                setTasks (tasks.concat([inputValue]));
                    setInputValue("");
                    setTasks(updatedTasks);
                    updateTasksOnServer(updatedTasks);
                }
            };

            const removeTasks = (indexToRemove) => {
                setTasks(tasks.filter((_, currentIndex) => currentIndex !== indexToRemove));
                setTasks(updatedTasks);
                updateTasksOnServer(updatedTasks);
                };
            
        const updateTasksOnServer = (updatedTasks) => { 
            fetch('https://playground.4geeks.com/apis/fake/todos/user/Dana-M', {
                method: "PUT",
                headers: {
                 "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTasks),
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
                      console.log('Tasks updated on the server:', data)
                  })
                .catch(error => {
                      // Error handling
                      console.log(error);
                  })

        }

        
                
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