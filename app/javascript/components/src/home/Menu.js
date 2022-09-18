import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../../../redux/configureStore';
import classes from './style.module.css';

const REQUEST_LOGOUT_USER = 'REQUEST_LOGOUT_USER';
const Menu = ({ closeMenuHandlerProps, flashMessageHandler }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const userId = useSelector((state) => state.userInfo.userID);
  const closeMenuHandler = () => {
    closeMenuHandlerProps();
  };
  useEffect(() => {
    if (!userId) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [userId]);
  const signOutHandler = () => {
    flashMessageHandler();
    store.dispatch({ type: REQUEST_LOGOUT_USER, id: userId });
    closeMenuHandlerProps();
  };
  return (
    <div className={classes.menu}>
      <nav className={classes.menu}>
        <NavLink to="/" className={classes.links} onClick={closeMenuHandler}>
          <div className={classes.imageContainer} />
        </NavLink>

        {loggedIn && (
        <>
          <NavLink to="/" className={classes.links} onClick={closeMenuHandler}>Chatroom</NavLink>
          <NavLink to="/messages" className={classes.links} onClick={closeMenuHandler}>Messages</NavLink>
          {userId && (
          <>
            <NavLink to="/logout" className={classes.listButtons} onClick={signOutHandler}>sign out</NavLink>
            <NavLink to={`/user/${userId}`} className={classes.links} onClick={closeMenuHandler}>Account</NavLink>
          </>
          )}
        </>
        )}
        {!loggedIn && <NavLink to="/login" className={classes.links} onClick={closeMenuHandler}>Login</NavLink>}

      </nav>
    </div>
  );
};

Menu.propTypes = {
  flashMessageHandler: PropTypes.func,
  closeMenuHandlerProps: PropTypes.func,
};

Menu.defaultProps = {
  flashMessageHandler: () => {},
  closeMenuHandlerProps: () => {},
};
export default Menu;
