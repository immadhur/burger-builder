import React, { useState, useEffect, Fragment, lazy, Suspense } from 'react';
import Burger from '../../components/Burger/Burger';
import style from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import DialogBoxModel from '../../components/UI/DialogBoxModel/DialogBoxModel';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
const OrderSummary = lazy(()=> import('../../components/Burger/BuildControls/OrderSummary/OrderSummary'));

const PriceChart = {
    cheese: 25,
    bacon: 40,
    meat: 70,
    salad: 20
}

const BurgerBuilder =props=>{

        const [showOrderSummary, setShowOrderSummary] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);

    useEffect(()=>{
    (async () => {
        try {
            const res = await axios.get('/ingredients');
            let price = 0;
            console.log(res.data);
            Object.keys(res.data.body).map(key => {
                return price += PriceChart[key] * res.data.body[key];
            })
            if (!props.building)
                props.initializeData(res.data.body, price);
        } catch (error) {
            setError(true);
        }
    })();
}, [])

    const showSummaryDialog = () => {
        props.isLoggedIn ?
            setShowOrderSummary( true ) :
            props.history.push('/login');
    }

    const hideSummaryDialog = () => {
            setShowOrderSummary( false );
    }

    const continueToCheckout = () => {
            setShowOrderSummary( false );
            setLoading( false );
        props.history.push('/checkout');
    }

        // if(state.checkout){
        //     return <Redirect to='/checkout'/>
        // }

        let disableInfo = { ...props.ingredients };
        for (let ingred in disableInfo) {
            disableInfo[ingred] = disableInfo[ingred] === 0;
        }

        let orderSummary = null;
        let burger = error ? <p>Unable to fetch data!</p> : <Spinner />;

        if (props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={props.ingredients} />
                    <BuildControls ingredients={props.ingredients}
                        addIngred={props.addIngredient}
                        removeIngred={props.removeIngredient}
                        disable={disableInfo}
                        totalPrice={props.totalPrice}
                        showSummaryDialog={showSummaryDialog}
                        isLoggedIn={props.isLoggedIn} />
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingred={props.ingredients}
                price={props.totalPrice}
                cancelClick={hideSummaryDialog}
                continueClick={continueToCheckout} />;
        }

        if (loading)
            orderSummary = <Spinner />

        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                <DialogBoxModel show={showOrderSummary} close={hideSummaryDialog}>
                    {orderSummary}
                </DialogBoxModel>
                </Suspense>
                {burger}
            </>
        );
    }

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.price,
        isLoggedIn: state.signup.token !== null,
        building: state.burger.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        initializeData: (ingred, price) => dispatch(actions.initialize(ingred, price)),
        resetPrice: () => dispatch(actions.resetPrice()),
        startBuilding: () => dispatch(actions.startBuilding())
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);