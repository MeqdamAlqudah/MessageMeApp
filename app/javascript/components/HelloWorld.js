import React from "react"
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {createStructuredSelector} from 'reselect';
const GET_THINGS_REQUEST = 'GET_THINGS_REQUEST';
const GET_THINGS_SUCCESS = "GET_THINGS_SUCCESS";
const getThings = ()=>
{return async (dispatch)=> {
  dispatch({  type: GET_THINGS_REQUEST});
  try {
    const response = await fetch(`v1/things`);
    const json = await response.json();
    return dispatch(getThingsSuccess(json));
  } catch (error) {
    return console.log(error);
  }
};};

export const getThingsSuccess = (json) => {
  return {
    type: GET_THINGS_SUCCESS,
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
        Greeting: {this.props.greeting}
      <button className="getThingsBtn" onClick={()=>this.props.getThings()}>get Things</button>
      <br/>
      <ul>{thingsList}</ul>
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
