
import { useNavigate } from 'react-router-dom';
import {} from '../style/addtask.css'
import { useState } from 'react';
const AddTask = () => {
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: '',
        description: ''
    });

function getTaskData(e){
    const {name, value} = e.target;
    setTaskData(prevState => ({
        ...prevState,
        [name]: value
    }));
    // console.log(taskData);
}

async function submitTask(e){
    e.preventDefault();
    console.log("Submitted Task Data:", taskData);
    let result = await fetch ('http://localhost:5000/add-task', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await result.json();
    console.log("---->",data);
    data && alert("Task Added Successfully")
    navigate('/');
}
  return (
    <div className="container">
        <h1>Add Task Page</h1>
        <form>
            <label htmlFor="">Title</label>
            <input type="text"
            onChange={getTaskData} 
            placeholder="Task Name" 
            name="title" />
            <label htmlFor="">Description</label>
            <textarea rows={4} name="description"
            onChange={getTaskData}
             id=""
            placeholder="Enter task description"></textarea>
            <button className="submit-button" type="submit" onClick={submitTask}>Add Task</button>
        </form>
    </div>
  )
}

export default AddTask;