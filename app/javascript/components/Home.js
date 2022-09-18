import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./src/./session/Login/Login";
import { useSelector } from "react-redux";
import './style.css';
import React, { useEffect, useState } from "react";
import Navigation from './src/home/Navigation'
import Chatroom from "./src/home/chatroom/Chatroom";
import { Navigate } from 'react-router-dom';
import FlashMessage from "./src/FlashMessage";
import Signup from "./src/session/Signup/Signup";
import Account from "./src/home/Account/Account";
import ReactDoM from 'react-dom';
import openConnection from "./src/home/chatroom/websocket";
import store from "../redux/configureStore";
import './env';
const Home = ()=>{
    const [loggedIn,setLoggedIn]  = useState(
      !!sessionStorage.getItem("userInfo")
    );
    const [flashMessage,setFlashMessage] = useState("");
    const [showPortal,setShowPortal] = useState(false);
    const navigate = useNavigate();
    const userId = useSelector((state)=>state.userInfo.userID);
    const username = useSelector((state)=>state.userInfo.username);
    useEffect(()=>{
        if(!userId){

        setLoggedIn(false);
    }else {
        
        setLoggedIn(true);
    }
    },[userId]);
    useEffect(()=>{
      if(loggedIn){
      navigate(`${location.pathname}`, { replace: true });
      }else{

      navigate('/login', { replace: true });

      }

    },[]);
    const signupHandler =()=>{
        navigate('/signup');
    };
    const flashMessageHandler =()=>{
      if(location.pathname === "/signup"){
        setFlashMessage("Signup Successfully");           
       setShowPortal(true);
       setLoggedIn(true);
      }else if(location.pathname === "/login"){
        setFlashMessage("Loged in Successfully");
        store.dispatch({type:"SEND_MESSAGE_TO_BACK_END",body:`${username} Joined this chat`,user_id: userId})

        navigate('/', { replace: true });
                  
                setLoggedIn(true);
    setShowPortal(true);
    }else {
                setFlashMessage("You have successfully logged out!!");
                setShowPortal(true);
                setLoggedIn(false);
                sessionStorage.clear();
                navigate('/login',{replace:true});
    }
    }

    const showHandler = ()=>{
      setShowPortal(false);
    }
    const portalFlashMessage = ReactDoM.createPortal(<FlashMessage text = {flashMessage} show={showHandler}/>,document.getElementById("flashMessageentryPoint"));
    
    return (

       
      <Navigation flashMessageHandler={flashMessageHandler}>
        {showPortal && portalFlashMessage}
        <Routes>
            {!loggedIn && <>
          <Route path="/login" element={<Login flashMessageHandler={flashMessageHandler} signupHandler={signupHandler}/>} />
          <Route path="/signup" element={<Signup flashMessageHandler={flashMessageHandler}/>}/></>}
          {loggedIn && <><Route path="/" element={<Chatroom onlineUsers = {openConnection()} socket={openConnection()}/>}/>
          <Route path="/user/:id" element={<Account/>}/><Route path="/messages" element={<h1>Under construction</h1>}/></>}
          {!loggedIn ?
          <Route path="*" element={
            <Navigate to="/login"/>
          }/>:<Route path="*" element={
            <h1>Wrong path </h1>
          } />}
        </Routes>
        </Navigation> 
    )
}

export default Home;