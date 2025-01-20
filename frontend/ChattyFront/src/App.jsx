import Navbar from './components/Navbar';
import './App.css'
import {Routes,Route, Navigate} from "react-router-dom";
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import { userAuthStore } from './store/userAuthStore';
import { useEffect } from 'react';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { themeStore } from './store/themeStore';

function App() {
  const { authUser ,checkAuth , isCheckingAuth ,onlineUsers } = userAuthStore();
  const {theme} = themeStore();

  console.log({ onlineUsers });

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="animate-spin size-10" />

    </div>
  )


  return (
    
      <div data-theme={theme} className='min-h-screen'>
        
       <Navbar />

       <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />

       </Routes>

       <Toaster />
      </div>
        
  
  )
}

export default App
