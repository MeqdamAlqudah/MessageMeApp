import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import store from '../../../../redux/configureStore';
import classes from './style.module.css';

const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';

const GET_USER_LOGIN = 'GET_USER_LOGIN';

export const LoginSuccess = (json) => ({
  type: GET_USER_INFO_REQUEST,
  json,
});
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.errorMessageRef = React.createRef();
    this.getLogin = this.getLogin.bind(this);
    this.state = {
      errorMessage: '',
    };
  }

  getLogin() {
    const { flashMessageHandler } = this.props;
    return async (dispatch) => {
      dispatch({ type: GET_USER_LOGIN });
      const response = await fetch('v1/login', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: this.usernameRef.current.value.trim(),
          password: this.passwordRef.current.value,
        }),
      });
      const json = await response.json();
      if (json.valid) {
        flashMessageHandler();
        this.setState({ errorMessage: '' });
        this.errorMessageRef.current.style.display = 'none';
        store.dispatch({ type: 'SEND_MESSAGE_TO_BACK_END', body: `${json.userInfo.username} Joined this chat 😊😊`, user_id: json.userInfo.userID });
        return dispatch(LoginSuccess(json));
      } if (json.errorMessage) {
        this.errorMessageRef.current.style.display = 'block';
        this.setState({ errorMessage: `${json.errorMessage}` });
      } else {
        this.errorMessageRef.current.style.display = 'block';
        this.setState({ errorMessage: 'Please enter a valid username or password!! ' });
      }
      return null;
    };
  }

  render() {
    const { errorMessage } = this.state;
    const { errorMessageRef } = this;
    const { signupHandler } = this.props;
    return (
      <section className={classes.loginSection}>
        <h2 className={classes.h2}>Welcome to MessageMe-a complete Chat App</h2>
        <div className={classes.loginContainerIcon} />
        <p className={classes.continue}>Login to continue</p>
        <div className={classes.containerLogin}>
          <div className={classes.loginContainer}>
            <form className={classes.loginForm}>
              <label htmlFor="username">Username</label>
              <input name="username" className={classes.usernameField} placeholder="Username" ref={this.usernameRef} required />
              <label htmlFor="password">Password</label>
              <input className={classes.passwordField} type="password" name="password" placeholder="Password" ref={this.passwordRef} required />
              <p className={classes.errorMessage} ref={errorMessageRef}>
                {errorMessage}
              </p>
              <button type="button" onClick={() => this.getLogin()(store.dispatch)}>Login</button>
            </form>
            <div className={classes.line}>
              <hr />
              OR
              <hr />
            </div>

            <div className={classes.signupPart}>
              <button type="button" onClick={() => signupHandler()}>Signup</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  flashMessageHandler: PropTypes.func,
  signupHandler: PropTypes.func,
};

Login.defaultProps = {
  flashMessageHandler: () => {},
  signupHandler: () => {},
};
const mapStateToProps = createStructuredSelector({

  userInfo: (state) => state.userInfo,
});
const mapDispatchToProps = { getLogin: Login.getLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
