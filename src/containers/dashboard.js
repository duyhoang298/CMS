import React, { Component } from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';



class Dashboard extends Component {


  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>ISOMORPHIC DASHBOARD HOME</h1>
          <button onClick={this.onClick}>GET</button>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}


export default Dashboard
