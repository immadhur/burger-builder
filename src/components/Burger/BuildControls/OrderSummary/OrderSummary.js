import React, { Fragment } from 'react';
import Button from '../../../UI/Button/Button';
import {Redirect} from 'react-router-dom';

const checkoutClickedHandler=(props)=>{
    props.continueClick();
    return(
        <Redirect to='/asa'/>
    );
}

const orderSummary = (props) => {
    const orderDetails =
        Object.keys(props.ingred).map((item) => {
            return (<li key={item}>
                <span style={{ textTransform: "capitalize" }}>
                    {item}: {props.ingred[item]}
                </span>
            </li>);
        })
    return (
        <Fragment>
            <h3>Order Summary</h3>
            <ul>{orderDetails}</ul>
            <strong>Total price: {props.price}</strong>
            <p>Continue to checkout?</p>
            <div style={{'text-align':'right'}}>
                <Button type='cancel' click={props.cancelClick}>Cancel</Button>
                <Button type='continue' click={()=>checkoutClickedHandler(props)}>Continue</Button>
            </div>
        </Fragment>
    );
}

export default orderSummary;