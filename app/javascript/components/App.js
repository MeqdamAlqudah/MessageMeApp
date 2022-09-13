import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/Login";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<h1>Home page</h1>}/>
          </Routes>
        </Router>
        </Provider>
    );
  }
}

export default App
