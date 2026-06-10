import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './Components/Signup.jsx'
import Home from './Components/Home.jsx'
import ForgetPassword from './Components/Forgetpassword.jsx'
import NewPassword from './Components/NewPassword.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup/>} />   
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/new-password" element={<NewPassword/>} />
        <Route path="/home" element={<Home />} />   
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
