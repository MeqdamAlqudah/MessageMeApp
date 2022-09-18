import classes from './style.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiFillCaretDown} from "react-icons/ai"; 
import {AiFillCaretUp} from "react-icons/ai"; 
import ReactDoM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import store from "../../../redux/configureStore"
import Menu from './Menu';
const REQUEST_LOGOUT_USER ="REQUEST_LOGOUT_USER";
const GET_USER_INFO = "GET_USER_INFO";
const Navigation = (props)=>{
    const [loggedIn,setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [showDropDown,setShowDropDown] = useState(false);
    const hamburger = useRef(null);
    const dropDownHandler = ()=>{
        setShowDropDown(!showDropDown);
    };
    const menuHandler = ()=>{

        setOpenMenu(!openMenu);
    }
    const [openMenu,setOpenMenu] = useState(false);
    const userId = useSelector((state)=>state.userInfo.userID);
    useEffect(()=>{
        if(userId){
        setLoggedIn(true);  
            
         }else {
            setLoggedIn(false);
            setShowDropDown(false);
         }
    },[userId]);
    useEffect(()=>{
        setShowDropDown(false);
    },[navigate]);
    const closeMenuHandler = ()=>{
        hamburger.current.click();
    }
    const portalFunction = ReactDoM.createPortal(<Menu flashMessageHandler = {props.flashMessageHandler} closeMenuHandler = {closeMenuHandler}/>,document.getElementById("menuPortal"));
    const portal =  openMenu && portalFunction;
    const signOutHandler = ()=>{
        props.flashMessageHandler();
        store.dispatch({type:REQUEST_LOGOUT_USER,id:userId});
    }
    const menuButtonClass = !openMenu ? classes.mobile + " container ": classes.mobile + " container "+classes.closeMenu + " "+classes.menuopen;
    
    return (
        <React.Fragment>
    <header className={classes.header}>
    <div className={menuButtonClass} >
    {portal}
    <input type="checkbox" id="checkbox1" className="checkbox1 visuallyHidden" onClick={menuHandler} ref={hamburger}/>
        <label htmlFor="checkbox1">
            <div className={openMenu?"hamburgerClose hamburger1":"hamburger hamburger1"}>
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
            </div>
        </label>
  </div>
        <nav className={classes.navMenu} >
{      loggedIn &&  <>     <NavLink to={'/'} className = {classes.links +" "+classes.linksfirst+" "+classes.desktop}>Chatroom</NavLink>
          
<NavLink to={'/messages'} className = {classes.links+" "+classes.linksecond+" "+classes.desktop}><span>Messages</span></NavLink>

            {userId && <div className = {classes.links+" "+classes.linksthird+" "+classes.desktop}>
            <div><span><NavLink to={`/user/${userId}`} className = {classes.accountButton}>Account</NavLink> {showDropDown?<AiFillCaretUp className={classes.icon}  onClick={dropDownHandler}/>:<AiFillCaretDown onClick={dropDownHandler} className={classes.icon}/>}</span> </div>
            <div className={showDropDown?"":classes.hidedorpdown}>
                <ul className={showDropDown?"":classes.hidedorpdown }>
                  {!loggedIn &&   
                    <li>
                    <NavLink to={'/login'} className ={classes.listButtons}>login</NavLink>

                    </li>}

                    <li>
                        <NavLink to={'/login'} className ={classes.listButtons} onClick={signOutHandler}>sign out</NavLink>
                    </li>
                {!loggedIn&& <li>
                    <NavLink to={'/signup'} className ={classes.listButtons}>signup</NavLink>
                </li>}
                </ul>
            </div>
            </div>}</>}
            {!loggedIn && <NavLink to={'/login'} className={classes.LoginNavigaiton +" "+classes.links+" "+classes.linksfourth+" "+classes.desktop}>Login</NavLink>}
           

        </nav>
    </header>
    {props.children}
    </React.Fragment>);
};

export default Navigation;