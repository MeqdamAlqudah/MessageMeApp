import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelloWorld from "./HelloWorld";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/hello" element={<HelloWorld/>} />
            <Route path="/" element={<h1>Home page</h1>}/>
          </Routes>
        </Router>
        </Provider>
    );
  }
}

export default App
