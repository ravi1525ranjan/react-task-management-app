
import  '../style/signup.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', userData);
    // Here you can add further logic to handle form submission, like sending data to a server
    let response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    console.log("Response from server:", data);
    document.cookie = `token=${data.token}`;
    data && alert("Signup Successful");
    navigate('/login');
  }

  return (
    <div className="container">
        <h1>Signup Page</h1>
        <form>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter your name" name="name" value={userData.name} onChange={handleChange} />
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter your email" name='email' value={userData.email} onChange={handleChange} />
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Enter your password" name='password' value={userData.password} onChange={handleChange} />
            <button className="submit-button" onClick={submitForm}>Signup</button>
        </form>
    </div>
  )
}

export default Signup;