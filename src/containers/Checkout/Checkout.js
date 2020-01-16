import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Checkout/ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

const Checkout = props => {

    const cancelClickHandler = () => {
        props.history.goBack();
    }

    const continueClickHandler = () => {
        props.history.replace(props.match.url + '/contactDetails');
    }

    let checkoutSummary = <Spinner />
    if (props.ingredients) {
        checkoutSummary = <CheckoutSummary
            ingredients={props.ingredients}
            cancelClick={cancelClickHandler}
            continueClick={continueClickHandler} />
    }
    return (
        <div style={{ 'text-align': 'center' }}>
            {checkoutSummary}
            <Route path={props.match.url + '/contactDetails'} render={() => <ContactData {...props}
                ingredients={props.ingredients}
                price={props.price} />} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price
    }
}

export default connect(mapStateToProps)(Checkout);