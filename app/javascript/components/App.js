import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Home';
import store from '../redux/configureStore';
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (

      <Provider store={store}>

        <Router>
          <Home />

        </Router>
      </Provider>
    );
  }
}
export default App;
