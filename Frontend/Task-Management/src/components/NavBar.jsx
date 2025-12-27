
import {Link} from 'react-router-dom'
import '../style/navbar.css'
import { useEffect, useState } from 'react';
function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <nav className='navbar'>
      <div className='logo'>Task Management</div>
      <ul className='nav-links'>
        {
          isLoggedIn ? (
            <>
              <li><Link to="/add">Add Task</Link></li>
              <li><Link to="/">Task List</Link></li>
              <li><Link to="/login" onClick={() => {
                localStorage.removeItem('user');  
                setIsLoggedIn(false);
              }}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )
        }
        {/* <li><Link to="/">Task List</Link></li>
        <li><Link to="/add">Add Task</Link></li>
        <li><Link to="/login">Logout</Link></li> */}
        {/* <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li> */}
      </ul>
    </nav>
  )
}

export default NavBar