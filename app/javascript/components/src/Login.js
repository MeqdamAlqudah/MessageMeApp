import React from "react"
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {createStructuredSelector} from 'reselect';
const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
const GET_USER_LOGIN = "GET_USER_LOGIN";
const getThings = (data)=>
{return async (dispatch)=> {
  dispatch({  type: GET_USER_INFO_REQUEST});
  try {
    const response = await fetch(`v1/login`,{
      method:"POST",
      body:data,
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    return dispatch(getThingsSuccess(json));
  } catch (error) {
    return console.log(error);
  }
};};

export const LoginSuccess = (json) => {
  return {
    type: GET_USER_LOGIN,
    json
  };
} 
class HelloWorld extends React.Component {

  render () {
    const {things} = this.props;
    const thingsList = things.map((thing)=>{
      return <li key={uuidv4()}>{thing.name} {thing.guid}</li>
    });
    return (
      <React.Fragment>
        <h2>Login page</h2>
        <form>
            <input type = "email" required/>
            <input type = "password" required/>
        </form>
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  things: state =>state.things,
});
const mapDispatchToProps = {getThings};
export default connect(mapStateToProps,mapDispatchToProps)(HelloWorld)
