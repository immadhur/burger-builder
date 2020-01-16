import * as actionType from '../actions/actionType';

const initialState = {
    ingredients: null,
    price: 0,
    building:false
}

const PriceChart = {
    cheese: 25,
    bacon: 40,
    meat: 70,
    salad: 20
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionType.ADDINGREDIENT):
                let updatedIngr = { ...state.ingredients };
                updatedIngr[action.ingred] += 1;
                const totalPrice = state.price + PriceChart[action.ingred];
            return {
                ...state,
                ingredients:updatedIngr,
                price:totalPrice,
                building:action.building
            }
            case (actionType.REMOVEINGREDIENT):
                // let updatedIngr = { ...state.ingredients };
                // updatedIngr[action.ingred] -= 1;
                // const totalPrice = state.price - PriceChart[action.ingred];
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingred]:state.ingredients[action.ingred]-1
                },
                price:state.price - PriceChart[action.ingred],
                building:action.building
            }
        case (actionType.INITIALIZE):
            return {
                ...state,
                ingredients:action.ingred,
                price:action.price,
                building:action.building
            }
        case (actionType.RESET_PRICE):
            let price=0;
            for(let i in state.ingredients){
                price+=PriceChart[i]
            }
            return{
                ...state,
                price:price
            }
        case (actionType.BUILDING):
            return{
                ...state,
                building:true
            }
            case (actionType.RESET_BUILDING):
            return{
                ...initialState
            }
    }
    return state;
}

export default reducer