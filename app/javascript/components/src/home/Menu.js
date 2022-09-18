import { useSelector } from "react-redux";
import store from "../../../redux/configureStore";
import React, { useEffect,useState } from "react";
import classes from './style.module.css';
import { NavLink } from "react-router-dom";
const REQUEST_LOGOUT_USER = "REQUEST_LOGOUT_USER";
const Menu = (props)=>{
    const [loggedIn,setLoggedIn]=useState(false);
    const userId = useSelector((state)=>state.userInfo.userID);
    const closeMenuHandler = ()=>{
        props.closeMenuHandler();
    }
    useEffect(()=>{
      if(!userId){
        setLoggedIn(false);
      }else {

        setLoggedIn(true);
      }
    },[userId]);
    const signOutHandler = ()=>{
        props.flashMessageHandler();
        store.dispatch({type:REQUEST_LOGOUT_USER,id:userId});
        props.closeMenuHandler();
    }
    return(
        <div className={classes.menu}>
      <nav className={classes.menu}>
      <NavLink to={'/'} className ={classes.links}  onClick={closeMenuHandler}>
    <div className={classes.imageContainer}>
    </div></NavLink>

              {loggedIn && <><NavLink to={'/'} className ={classes.links}  onClick={closeMenuHandler}>Chatroom</NavLink>
              <NavLink to={'/messages'} className={classes.links}onClick={closeMenuHandler}>Messages</NavLink>
              {userId&&<><NavLink to={'/logout'} className ={classes.listButtons} onClick={signOutHandler}>sign out</NavLink>
              <NavLink to={`/user/${userId}`} className= {classes.links}onClick={closeMenuHandler}>Account</NavLink> </>}</>}
             {!loggedIn&&<NavLink to={'/login'} className={classes.links} onClick={closeMenuHandler}>Login</NavLink>}

          </nav>
        </div>
    );
  }

export default Menu;