import React, { Component, Fragment } from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import { BrowserRouter, Route } from 'react-router-dom'
import Checkout from './Checkout/Checkout';

class App extends Component {

  state = {
    isSideDrawerVisible: false
  }

  showSideDrawer = () => {
    this.setState({ isSideDrawerVisible: true });
  }

  hideBackdrop = () => {
    this.setState({ isSideDrawerVisible: false });
  }

  render() {
    return (
      <BrowserRouter>
        <Toolbar showSideDrawer={this.showSideDrawer} />
        <SideDrawer isVisible={this.state.isSideDrawerVisible} hideBackdrop={this.hideBackdrop} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/' exact component={BurgerBuilder} />
      </BrowserRouter>
    );
  }
}

export default App;
