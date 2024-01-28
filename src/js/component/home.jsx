import React from "react";
import Todo from "./todo.jsx";



//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Welcome to your list</h1>
			<Todo /> 

		</div> 
	);
};

export default Home;
