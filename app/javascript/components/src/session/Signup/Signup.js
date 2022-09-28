import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from '../Login/style.module.css';
import store from '../../../../redux/configureStore';

const GET_USER_SIGNUP = 'GET_USER_SIGNUP';
const Signup = ({ flashMessageHandler }) => {
  const usernameRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmpasswordRef = useRef(null);
  const errorMessageRef = useRef(null);
  const navigate = useNavigate();
  const signupHandler = (event) => {
    event.preventDefault();
    if (passwordRef.current.value === confirmpasswordRef.current.value) {
      store.dispatch({ type: GET_USER_SIGNUP });
      fetch('/v1/users', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: usernameRef.current.value.trim(),
          email: emailRef.current.value.trim(),
          password: passwordRef.current.value,
        }),
      }).then((response) => response.json()).then((json) => {
        if (json.valid) {
          errorMessageRef.current.style.display = 'none';
          store.dispatch({ type: 'SIGN_UP_USER', data: json.userInfo });
          setErrorMessage('');

          flashMessageHandler();
          navigate('/');
        } else {
          errorMessageRef.current.style.display = 'block';
          setErrorMessage('Please enter a valid username or password!! ');
        }
      });
    } else {
      errorMessageRef.current.style.display = 'block';
      setErrorMessage('Make sure that password and cofirmation are equal ');
    }
  };
  return (
    <section className={classes.loginSection}>
      <h2 className={classes.h2}>Welcome to MessageMe-a complete Chat App</h2>
      <div className={classes.loginContainerIcon} />
      <p className={classes.continue}>Signup to continue</p>
      <div className={classes.containerLogin}>
        <div className={classes.loginContainer}>
          <form className={classes.loginForm}>
            <label htmlFor="username">Username</label>
            <input name="username" className={classes.usernameField} placeholder="Username" ref={usernameRef} required />
            <label htmlFor="email">Email</label>
            <input name="email" className={classes.emailFeild} placeholder="Email" ref={emailRef} required />
            <label htmlFor="password">Password</label>
            <input type="password" className={classes.passwordField} name="password" placeholder="Password" ref={passwordRef} required />
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type="password" name="confirmpassword" placeholder="Confirm Password" ref={confirmpasswordRef} required />
            <ul className="passwordInfo">
              <li>password length must be at least 8</li>
            </ul>
            <p className={classes.errorMessage} ref={errorMessageRef}>{errorMessage}</p>
            <button type="submit" onClick={signupHandler}>signup</button>
            <NavLink to="/login" className={classes.toLogin}>already signed in?</NavLink>
          </form>
        </div>
      </div>
    </section>
  );
};

Signup.propTypes = {
  flashMessageHandler: PropTypes.func,
};

Signup.defaultProps = {
  flashMessageHandler: () => {},
};

export default Signup;
