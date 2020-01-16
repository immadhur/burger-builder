import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import style from './Login.module.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        formData: {
            email: this.createFormConfig('input', 'email', 'Email Address'),
            password: this.createFormConfig('input', 'password', 'Password')
        },
        btnText1: 'LOGIN',
        btnText2: 'SIGNUP',
        showErrorDialog: false
    }

    componentDidMount() {
        this.setState({ showErrorDialog: !this.props.success })
    }

    createFormConfig(elementType, inputType, placeholder) {
        const config = {
            elementType: elementType,
            elementConfig: {
                type: inputType,
                placeholder: placeholder
            },
            value: '',
            validation: {
                required: true
            },
            isValid: false
        }
        return config;
    }

    inputChangedHandler = (event, element) => {
        const formData = { ...this.state.formData };
        formData[element].value = event.target.value;
        this.setState({ formData: formData });
    }

    buttonClickHandler = (event) => {
        event.preventDefault();
        let isSignUp = this.state.btnText1 === 'SIGNUP' ? true : false;
        this.props.signup(this.state.formData.email.value, this.state.formData.password.value, isSignUp)
    }

    switchButton = (event) => {
        event.preventDefault();
        this.setState({ btnText1: this.state.btnText2, btnText2: this.state.btnText1 });
    }

    closeDialog = () => {
        this.setState({ showErrorDialog: false })
    }

    render() {


        if (this.props.success) {
            return this.props.isBurgerReady ?
                <Redirect to='/checkout' /> :
                <Redirect to='/' />
        }

        const formFields = (
            Object.keys(this.state.formData).map(element => {
                const config = this.state.formData[element];
                return <Input
                    key={element}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    changed={(event) => this.inputChangedHandler(event, element)} />
            })
        );

        let form =
            this.props.loading ? <Spinner /> : (
                <form>
                    {formFields}
                    <p style={{ color: "red" }}>{this.props.error}</p>
                    <Button click={this.buttonClickHandler} type="continue">{this.state.btnText1}</Button>
                    <Button click={this.switchButton} type="cancel">{this.state.btnText2}</Button>
                </form>
            );

        return (
            <div className={style.Body}>
                {/* {errorDialog} */}
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.signup.loading,
        success: state.signup.success,
        error: state.signup.error,
        isBurgerReady: state.burger.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (email, pass, isSignup) => dispatch(actions.signup(email, pass, isSignup))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)