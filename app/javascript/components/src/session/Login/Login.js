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
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
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
        email:this.emailRef.current.value,
        password:this.passwordRef.current.value,
      })});
    const json = await response.json();
    if(json.valid){
      this.setState({errorMessage:""});
    return dispatch(LoginSuccess(json));
     }else {
      this.setState({errorMessage:"Please enter a valid email or password!! "});
    }
};};
  render () {
    return (
      <React.Fragment>
        <h2>Login page</h2>
        <form >
           <label htmlFor="email">Email</label>
            <input type = "email" name = "email" ref={this.emailRef} required/>
            <label htmlFor="password"></label>
            <input type = "password" name="password" ref= {this.passwordRef} required/>
            <p className={classes.errorMessage} >{this.state.errorMessage}</p>
            <button type="button" onClick={()=>this.getLogin()(store.dispatch)}>Login</button>
        </form>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  greeting: PropTypes.string
};

const mapStateToProps = createStructuredSelector({

  userInfo: state =>state.userInfo,
});
const mapDispatchToProps = {getLogin:Login.getLogin};
export default connect(mapStateToProps,mapDispatchToProps)(Login);