import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../src/style/App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask.jsx'
import ListTask from './components/ListTask.jsx'
import EditTask from './components/EditTask.jsx'
import Signup from './components/signup.jsx'
import Login from './components/Login.jsx'
import Protected from './components/Protected.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Protected><ListTask /></Protected>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/logout' element={<Login />} /> */}
        <Route path='/add' element={<Protected><AddTask /></Protected>} />
         <Route path='/edit/:id' element={<Protected><EditTask/></Protected>} />
      </Routes>
    </>
  )
}

export default App
