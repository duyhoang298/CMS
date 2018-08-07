import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import * as authAction from '../../redux/actions/auth';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import PropTypes from 'prop-types'
// import common from '../../common'
const { login, verifyToken } = authAction;

class SignIn extends Component {
  state = {
    email: 'real-estate-linh@gmail.com',
    password: '123456',
    redirectToReferrer: false,
  };

  componentWillMount = () => {
    const { loggedIn, history } = this.props;
    loggedIn && history.push('/dashboard/investors');
    // state: { from: props.location },
  };

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     this.props.isLoggedIn !== nextProps.isLoggedIn &&
  //     nextProps.isLoggedIn === true
  //   ) {
  //     this.setState({ redirectToReferrer: true });
  //   }
  // }
  
  onChange = async event => {
    const { name, value } = event.target;
    await this.setState({
      [name]: value
    });
    await this.validateField();
  };

 
  handleLogin = (e) => {

 
    const { login } = this.props;
    let user = {
      session: {
        email: this.state.email,
        password: this.state.password
      }
    }
    // console.log(user);
    login(user);
  };

  render() {
    const from = { pathname: '/dashboard/buildings' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" name='email' onChange={this.onChange} value={this.state.email} />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" name='password' onChange={this.onChange} value={this.state.password} />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>

              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}


export default connect(
  state => ({
    token: state.auth.token,
    loggedIn: state.auth.loggedIn
  }),
  { login, verifyToken }
)(SignIn);

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
  verifyToken: PropTypes.func.isRequired,
  status: PropTypes.number,
  token: PropTypes.string,
  loggedIn: PropTypes.bool
};

SignIn.defaultProps = {
  token: ''
};
