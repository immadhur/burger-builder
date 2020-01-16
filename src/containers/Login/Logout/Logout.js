import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import { Redirect } from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner';
class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return this.props.isLoggedIn ?
            <Spinner /> :
            <Redirect to='/' />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(action.logout())
            dispatch(action.resetBurger())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.signup.success
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);