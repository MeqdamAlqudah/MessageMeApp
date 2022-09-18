import React from "react"
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import store from '../../../../redux/configureStore';
import classes from './style.module.css'
import {createStructuredSelector} from 'reselect';
const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';

const GET_USER_LOGIN = "GET_USER_LOGIN";


export const LoginSuccess = (json) => {
  return {
    type: GET_USER_INFO_REQUEST,
    json
  };
} 
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.errorMessageRef = React.createRef();
    this.getLogin = this.getLogin.bind(this);
    this.state = {
      errorMessage:"",
    };
  }
  getLogin(){
  return async (dispatch)=> {
  dispatch({  type: GET_USER_LOGIN});
    const response = await fetch(`v1/login`,{
      method:"POST",
      headers: {

        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({
        username:this.usernameRef.current.value,
        password:this.passwordRef.current.value,
      })});
    const json = await response.json();
    if(json.valid){
      this.props.flashMessageHandler();
      this.setState({errorMessage:""});
   this.errorMessageRef.current.style.display = "none";
   return dispatch(LoginSuccess(json));
     }else if(json.errorMessage) {
      this.errorMessageRef.current.style.display = "block";
      this.setState({errorMessage:`${json.errorMessage}`});
     }else{
     this.errorMessageRef.current.style.display = "block";
      this.setState({errorMessage:"Please enter a valid username or password!! "});
    }
}};
  render () {
    
    return (
      <section className={classes.loginSection}>
        <h2 className={classes.h2}>Welcome to MessageMe-a complete Chat App</h2>
        <div className={classes.loginContainerIcon}></div>
        <p className={classes.continue}>Login to continue</p>
        <div className = {classes.containerLogin}>
        <div className={classes.loginContainer}>
        <form className={classes.loginForm}>
           <label htmlFor="username" >Username</label>
            <input name = "username" className={classes.usernameField} placeholder="Username" ref={this.usernameRef} required/>
            <label htmlFor="password">Password</label>
            <input className={classes.passwordField} type = "password" name="password" placeholder = "Password" ref= {this.passwordRef} required/>
            <p className={classes.errorMessage} ref={this.errorMessageRef}>{this.state.errorMessage}</p>
            <button type="button" onClick={()=>this.getLogin()(store.dispatch)}>Login</button>
        </form>
        <div className={classes.line}>
        <hr/>OR<hr/>
        </div>

        <div className={classes.signupPart}>
          <button type="button" onClick={()=>this.props.signupHandler()}>Signup</button>
        </div>
        </div>
        </div>
      </section>
    );
  }
 };

Login.propTypes = {
  greeting: PropTypes.string
};

const mapStateToProps = createStructuredSelector({

  userInfo: state =>state.userInfo,
});
const mapDispatchToProps = {getLogin:Login.getLogin};
export default connect(mapStateToProps,mapDispatchToProps)(Login);