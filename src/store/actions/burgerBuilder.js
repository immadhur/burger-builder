import * as actionTypes from './actionType';

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADDINGREDIENT,
        ingred:name,
        building:true
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVEINGREDIENT,
        ingred:name,
        building:true
    }
}

export const initialize=(name, price)=>{
    return{
        type:actionTypes.INITIALIZE,
        ingred: name,
        price: price,
        building:false
    }
}

export const resetPrice=()=>{
    return{
        type:actionTypes.RESET_PRICE
    }
}

export const startBuilding=()=>{
    return{
        type:actionTypes.BUILDING
    }
}

export const resetBurger=()=>{
    return{
        type:actionTypes.RESET_BUILDING
    }
}