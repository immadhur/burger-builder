import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import style from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import DialogBoxModel from '../../components/UI/DialogBoxModel/DialogBoxModel';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';

const PriceChart = {
    cheese: 25,
    bacon: 40,
    meat: 70,
    salad: 20
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            bacon: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 0,
        showOrderSummary:false
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

    showSummaryDialog=()=>{
        this.setState({showOrderSummary:true});
    }

    hideSummaryDialog=()=>{
        this.setState({showOrderSummary:false});
    }

    render() {
        let disableInfo = { ...this.state.ingredients };
        for (let ingred in disableInfo) {
            disableInfo[ingred] = disableInfo[ingred] === 0;
        }

        return (
            <div style={{'margin-top':'60px'}}>
                <DialogBoxModel show={this.state.showOrderSummary} hideSummary={this.hideSummaryDialog}>
                    <OrderSummary
                     ingred={this.state.ingredients} 
                     price={this.state.totalPrice}
                     cancelClick={this.hideSummaryDialog}
                     continueClick={this.hideSummaryDialog}/>
                </DialogBoxModel>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredients={this.state.ingredients}
                    addIngred={this.addIngredientHandler}
                    removeIngred={this.removeIngredientHandler}
                    disable={disableInfo}
                    totalPrice={this.state.totalPrice}
                    showSummaryDialog={this.showSummaryDialog}/>
            </div>
        );
    }
}

export default BurgerBuilder;