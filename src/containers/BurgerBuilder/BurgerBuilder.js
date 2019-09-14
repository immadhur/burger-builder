import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import style from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import DialogBoxModel from '../../components/UI/DialogBoxModel/DialogBoxModel';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {Redirect} from 'react-router-dom';

const PriceChart = {
    cheese: 25,
    bacon: 40,
    meat: 70,
    salad: 20
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        showOrderSummary: false,
        loading: false,
        error: false,
        checkout:false
    }

    componentDidMount = async () => {
        try {
            const res = await axios.get('/ingredients.json');
            let price=this.state.totalPrice;
            Object.keys(res.data).map(key=>{
                return price+=PriceChart[key]*res.data[key];
            })
            this.setState({ ingredients: res.data, totalPrice:price });
        } catch (error) {
            this.setState({ error: true });
        }
    }

    addIngredientHandler = (ingred) => {
        let updatedIngr = { ...this.state.ingredients };
        updatedIngr[ingred] += 1;
        const totalPrice = this.state.totalPrice + PriceChart[ingred];
        this.setState({ ingredients: updatedIngr, totalPrice });
    }

    removeIngredientHandler = (ingred) => {
        let updatedIngr = { ...this.state.ingredients };
        if (updatedIngr[ingred] <= 0)
            return;
        updatedIngr[ingred] -= 1;
        const totalPrice = this.state.totalPrice - PriceChart[ingred];

        this.setState({ ingredients: updatedIngr, totalPrice });
    }

    showSummaryDialog = () => {
        this.setState({ showOrderSummary: true });
    }

    hideSummaryDialog = () => {
        this.setState({ showOrderSummary: false });
    }

    continueToCheckout = () => {
            this.setState({ loading: false, showOrderSummary: false});
            let queryParam=[];
            const ingr=this.state.ingredients;
            for(let i in ingr){
                queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(ingr[i]));
            }
            queryParam.push(`price=${this.state.totalPrice}`)
            this.props.history.push({
                pathname:'/checkout',
                search: '?'+queryParam.join('&')
            });
    }

    render() {
        // if(this.state.checkout){
        //     return <Redirect to='/checkout'/>
        // }

        let disableInfo = { ...this.state.ingredients };
        for (let ingred in disableInfo) {
            disableInfo[ingred] = disableInfo[ingred] === 0;
        }

        let orderSummary = null;
        let burger = this.state.error?<p>Unable to fetch data!</p>:<Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredients={this.state.ingredients}
                        addIngred={this.addIngredientHandler}
                        removeIngred={this.removeIngredientHandler}
                        disable={disableInfo}
                        totalPrice={this.state.totalPrice}
                        showSummaryDialog={this.showSummaryDialog} />
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingred={this.state.ingredients}
                price={this.state.totalPrice}
                cancelClick={this.hideSummaryDialog}
                continueClick={this.continueToCheckout} />;
        }

        if (this.state.loading)
            orderSummary = <Spinner />

        return (
            <div style={{ 'marginTop': '60px' }}>
                <DialogBoxModel show={this.state.showOrderSummary} close={this.hideSummaryDialog}>
                    {orderSummary}
                </DialogBoxModel>
                {burger}
            </div>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);