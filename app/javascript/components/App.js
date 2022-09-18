import React from "react";
import Home from './Home.js';
import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/configureStore";
import { Provider } from "react-redux";
class App extends React.Component {
  render () {
    return (

      <Provider store={store}>

        
      <Router>
      <Home/>


      </Router>
      </Provider>
    );
  }
}
export default App;