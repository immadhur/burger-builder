import React, { useState, useEffect, Suspense } from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Checkout from './Checkout/Checkout';
import OrderDetails from './OrderDetails/OrderDetails';
import Login from '../containers/Login/Login';
import Logout from '../containers/Login/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

const Checkout=React.lazy(()=>{
  return import('./Checkout/Checkout');
})

const App = props => {
  const [isSideDrawerVisible, setSideDrawerVisiblility] = useState(false);

  useEffect(() => {
    props.checkAuth();
  }, []);

  const sideDrawerHandler = () => {
    setSideDrawerVisiblility(true);
  }

  const hideBackdrop = () => {
    setSideDrawerVisiblility(false);
  }

  const WaitingComponent=(Component)=> {
    return props => (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  }

  let routes;
  if (props.isAuth) {
    routes = <Switch>
      <Route path='/checkout' component={WaitingComponent(Checkout)} />
      <Route path='/orders' exact component={OrderDetails} />
      <Route path='/logout' exact component={Logout} />
      <Route path='/' component={BurgerBuilder} />
    </Switch>
  }
  else {
    routes =
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/' component={BurgerBuilder} />
      </Switch>
  }
  return (
    <BrowserRouter>
      {/* <Redirect to='/login' /> */}
      <Toolbar isLoggedIn={props.isAuth} showSideDrawer={sideDrawerHandler} />
      <SideDrawer isLoggedIn={props.isAuth} isVisible={isSideDrawerVisible} click={hideBackdrop} />
      <Suspense fallback={<h2>Product list is loading...</h2>}>{routes}</Suspense>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.signup.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(actions.checkAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
