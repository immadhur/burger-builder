import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button/Button';
import style from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.createFormConfig('input', 'text', 'Name'),
            // email: this.createFormConfig('input', 'email', 'Email Address'),
            contact: this.createFormConfig('input', 'number', 'Contact Number'),
            address: this.createFormConfig('input', 'text', 'Address'),
            deliveryType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation:{
                },
                isValid:true
            }
        },
        ingredients: null,
        loading: false,
        totalPrice: 0
    }

    createFormConfig(elementType, inputType, placeholder) {
        const config = {
            elementType: elementType,
            elementConfig: {
                type: inputType,
                placeholder: placeholder
            },
            value: '',
            validation:{
                required:true
            },
            isValid:false
        }
        return config;
    }

    componentWillMount() {
        this.setState({ ingredients: this.props.ingredients, totalPrice: this.props.price });
    }

    checkValidity(value, rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.trim()>=rules.minLength && isValid;
        }
        return isValid;
    }

    orderClickHandler = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        for(let item in this.state.orderForm){
            if(!this.state.orderForm[item].isValid){
                alert(`Please add ${item}`);
                this.setState({ loading: false })
                return;
            }
        }
        if (this.state.ingredients == null || Object.entries(this.state.ingredients).length === 0 ) {
            alert("Please add Ingredients!");
            this.setState({ loading: false })
            return;
        }
        let formData={};
        for(let item in this.state.orderForm){
            formData[item]=this.state.orderForm[item].value
        }
        const dataToPost = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customerDetails:formData,
            email:this.props.email
        }

        try {
            this.props.resetBurger();
            await axios.post('/order', dataToPost);
            this.setState({ loading: false });
            this.props.history.push('/orders');
        } catch (error) {
            console.log('Some error occured!', error)
            this.setState({ loading: false })
        }
    }

    inputChangedHandler=(event, elementId)=>{
        let updatedValue=this.state.orderForm;
        updatedValue[elementId].value=event.target.value;
        updatedValue[elementId].isValid=this.checkValidity(event.target.value, updatedValue[elementId].validation);
        console.log(updatedValue);
        this.setState({orderForm:updatedValue});
    }

    render() {
        let dataToShow = <Spinner />
        const formData = Object.keys(this.state.orderForm).map(element => {
            const config = this.state.orderForm[element];
            return <Input elementType={config.elementType}
                value={config.value}
                key={element}
                elementConfig={config.elementConfig} 
                changed={(event)=>this.inputChangedHandler(event, element)}/>
        })
        if (!this.state.loading) {
            dataToShow = (
                <form onSubmit={this.orderClickHandler}>
                    {formData}
                    <Button type='continue'>ORDER</Button>
                </form>
            );
        }
        return (
            <div className={style.Body}>
                <h2>Just few more Details!</h2>
                {dataToShow}
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        token:state.signup.token,
        email:state.signup.email
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        resetBurger:()=>dispatch(actions.resetBurger())
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(ContactData), axios);