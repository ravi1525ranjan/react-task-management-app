
import { useNavigate } from 'react-router-dom';
import {} from '../style/addtask.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const EditTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

useEffect(() => {
    getTaskById();
}, [id]);

function getTaskById() {
    // Fetch task data by ID from backend
    fetch(`http://localhost:5000/task/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        setTaskData({
            title: data.title,
            description: data.description
        });
    })
    .catch(error => {
        console.error("Error fetching task:", error);
    });
}

async function updateTask(e){
    e.preventDefault();
    console.log("Submitted Task Data:", taskData);
    let result = await fetch (`http://localhost:5000/update-task/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await result.json();
    console.log("---->",data);
    data && alert("Task Updated Successfully")
    navigate('/');
}
  return (
    <div className="container">
        <h1>Edit Task Page</h1>
        <form>
            <label htmlFor="">Title</label>
            <input type="text"
            value={taskData.title}
            onChange={getTaskData} 
            placeholder="Task Name" 
            name="title" />
            <label htmlFor="">Description</label>
            <textarea rows={4} name="description"
            value={taskData.description}
            onChange={getTaskData}
             id=""
            placeholder="Enter task description"></textarea>
            <button className="submit-button" type="submit" onClick={updateTask}>Edit Task</button>
        </form>
    </div>
  )
}

export default EditTask;