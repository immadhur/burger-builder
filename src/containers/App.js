import React, {Component, Fragment} from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
class App extends Component {

  state={
    isSideDrawerVisible:false
  }

  showSideDrawer=()=>{
    this.setState({isSideDrawerVisible:true});
  }

  hideBackdrop=()=>{
    this.setState({isSideDrawerVisible:false});
  }

  render(){
  return (
    <Fragment>
      <Toolbar showSideDrawer={this.showSideDrawer}/>
      <SideDrawer isVisible={this.state.isSideDrawerVisible} hideBackdrop={this.hideBackdrop}/>
      <BurgerBuilder/>
    </Fragment>
  );
}
}

export default App;
