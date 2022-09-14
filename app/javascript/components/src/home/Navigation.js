import classes from './style.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from "react";
const Navigation = (props)=>{
    const userId = useSelector((state)=>state.userInfo.id);
    return (
        <>
    <header className={classes.header}>
    <div className={classes.mobile+" "+"menu cross menu--1"} >
    <label>
      <input type="checkbox"/>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" />
        <path className = "line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
        <path className = "line--2" d="M0 50h70" />
        <path className = "line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
      </svg>
    </label>
  </div>
        <nav className={classes.navMenu} >
            <NavLink to={'/chatroom'} className = {classes.links}>Chatroom</NavLink>
            <NavLink to={'/messages'} className = {classes.links}>messages</NavLink>
            <NavLink to={`/profile/${userId}`} className = {classes.links}>
            <div>Account</div>
            <div className={classes.hidedorpdown}>
                <ul className={classes.hidedorpdown}>
                </ul>
            </div>
            </NavLink>
            <NavLink to={'/login'} className={classes.LoginNavigaiton +" "+classes.links}>Login</NavLink>
        </nav>
    </header>
    {props.children}
    </>);
};

export default Navigation;