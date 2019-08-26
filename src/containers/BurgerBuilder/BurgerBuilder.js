import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import style from './BurgerBuilder.module.css'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 0
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


    render() {
        let disableInfo = { ...this.state.ingredients };
        for (let ingred in disableInfo) {
            disableInfo[ingred] = disableInfo[ingred] === 0;
        }

        return (
            <div className={style.Body}>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredients={this.state.ingredients}
                    addIngred={this.addIngredientHandler}
                    removeIngred={this.removeIngredientHandler}
                    disable={disableInfo} 
                    totalPrice={this.state.totalPrice}/>
            </div>
        );
    }
}

export default BurgerBuilder;