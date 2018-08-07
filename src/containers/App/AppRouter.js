import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../dashboard'))}
        />
        <Route
          exact
          path={`${url}/blankPage`}
          component={asyncComponent(() => import('../blankPage'))}
        />
        <Route
          exact
          path={`${url}/projects`}
          component={asyncComponent(() => import('../ProjectsManager'))}
        />
        <Route
          exact
          path={`${url}/buildings`}
          component={asyncComponent(() => import('../BuildingsManager'))}
        />
        <Route
          exact
          path={`${url}/investors`}
          component={asyncComponent(() => import('../InvestorsManager'))}
        />
        <Route
          exact
          path={`${url}/users`}
          component={asyncComponent(() => import('../UsersManager'))}
        />
      </Switch>
    );
  }
}

export default AppRouter;
