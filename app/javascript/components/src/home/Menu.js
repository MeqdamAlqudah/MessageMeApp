import { useSelector } from "react-redux";
import store from "../../../redux/configureStore";
import React from "react";
import classes from './style.module.css';
import { NavLink } from "react-router-dom";
const LOGOUT_USER = "LOGOUT_USER";
const Menu = (props)=>{
    const userId = useSelector((state)=>state.userInfo.userID);
    const closeMenuHandler = ()=>{
        props.closeMenuHandler();
    }

    const signOutHandler = ()=>{
        store.dispatch({type:LOGOUT_USER});
        props.closeMenuHandler();
    }
    return(
        <div className={classes.menu}>

      <nav className={classes.menu}>
              <NavLink to={'/chatroom'} className ={classes.links}  onClick={closeMenuHandler}>Chatroom</NavLink>
              <NavLink to={'/messages'} className={classes.links}onClick={closeMenuHandler}>Messages</NavLink>
              {userId&&<><NavLink to={'/logout'} className ={classes.listButtons} onClick={signOutHandler}>sign out</NavLink>
              <NavLink to={`/user/${userId}`} className= {classes.links}onClick={closeMenuHandler}>Account</NavLink> </>}
              <NavLink to={'/login'} className={classes.links} onClick={closeMenuHandler}>Login</NavLink>
          </nav>
        </div>
    );
  }

export default Menu;