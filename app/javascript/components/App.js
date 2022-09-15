import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/./session/Login/Login";
import { Provider } from "react-redux";
import './style.css';
import store from "../redux/configureStore";
import Navigation from './src/home/Navigation'

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      
      <Provider store={store}>
        
        <Router>
         
        <Navigation>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<h1>Home page</h1>}/>
          </Routes>
          </Navigation> 
        </Router>

        </Provider>
    );
  }
}

export default App
