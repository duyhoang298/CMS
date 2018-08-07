import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
      : <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />}
  />
);

class PublicRoutes extends React.Component {


  render(){
    // console.log('dssad', this.props);
    const {history, isLoggedIn} = this.props
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route
            exact
            path={'/'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route
            exact
            path={'/signin'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <RestrictedRoute
            path="/dashboard"
            component={App}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </ConnectedRouter>
    );
  }
}

// const PublicRoutes = ({ history, isLoggedIn }) => {
 
// };
function mapStateToProps(state){
   return{
    // isLoggedIn: true,
    isLoggedIn: state.auth.loggedIn,
   }
}

export default connect(mapStateToProps, null)(PublicRoutes);
