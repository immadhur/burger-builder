import React, { Fragment } from 'react';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
    const orderDetails =
        Object.keys(props.ingred).map((item) => {
            return (<li>
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
                <Button type='cancel' text='cancel' click={props.cancelClick}/>
                <Button type='continue' text='continue' click={props.continueClick}/>
            </div>
        </Fragment>
    );
}

export default orderSummary;