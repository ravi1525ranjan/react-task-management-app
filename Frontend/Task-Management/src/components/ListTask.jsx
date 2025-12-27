import { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import '../style/listtask.css'

const ListTask = () => {
    const [taskList, setTaskList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    },[]);

    const fetchTasks = async () => {
        let result = await fetch('http://localhost:5000/tasks', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await result.json();
        console.log("Fetched Tasks:", data);
        setTaskList(data);
    }

    const modifyTask = (id) => {
        console.log("Modify Task with ID:", id);
        // Navigate to edit page or open edit modal
        navigate(`/edit/${id}`);
    }

    const deleteTask = async (id) => {
        console.log("Delete Task with ID:", id);
        let result = await fetch(`http://localhost:5000/delete-task/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await result.json();
        console.log("Delete Task Response:", data);
        if (data) {
            alert("Task Deleted Successfully");
            fetchTasks(); // Refresh the task list
        }
    }

    return (
        <div className="container">
            <h1>Tasks List</h1>

            <table className="task-table">
                <thead className="table-heading">
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {taskList.map((task, index) => (
                        <tr key={task._id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td className="action-buttons">
                                <button className="edit-button" onClick={() => modifyTask(task._id)}>Update</button>
                                <button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTask;