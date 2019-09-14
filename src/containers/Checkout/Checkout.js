import React, { Component } from 'react';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Checkout/ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: null,
        price:0
    }

    cancelClickHandler=()=>{
        this.props.history.goBack();
    }

    continueClickHandler=()=>{
        this.props.history.replace(this.props.match.url+'/contactDetails');
    }

    async componentWillMount() {
        let urlIngredients={};
        const queryParams=new URLSearchParams(this.props.location.search);
        let price=0;
        for(let param of queryParams.entries()){
            if(param[0] === 'price')
                price=param[1];
            else
                urlIngredients[param[0]]=Number(param[1]);
        }
        this.setState({ingredients:urlIngredients, price:price});
    }

    render() {
        let checkoutSummary = <Spinner />
        if (this.state.ingredients) {
            checkoutSummary = <CheckoutSummary 
            ingredients={this.state.ingredients}
            cancelClick={this.cancelClickHandler}
            continueClick={this.continueClickHandler} />
        }
        return (
            <div style={{'text-align':'center'}}>
                {checkoutSummary}
                <Route path={this.props.match.url+'/contactDetails'} render={()=><ContactData {...this.props} 
                ingredients={this.state.ingredients}
                price={this.state.price}/>}/>
            </div>
        );
    }
}

export default Checkout;