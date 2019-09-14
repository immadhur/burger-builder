import React from 'react';
import style from './BurgerIngredients.module.css'

const ingredient = (props)=>{
    let styleToApply='';
    switch(props.type){
        case 'top':
            styleToApply=style.BreadTop;
            break;
        case 'bottom':
            styleToApply=style.BreadBottom;
            break;
        case 'meat':
            styleToApply=style.Meat;
            break;
        case 'cheese':
            styleToApply=style.Cheese;
            break;
        case 'bacon':
            styleToApply=style.Bacon;
            break;
        case 'salad':
            styleToApply=style.Salad;
            break;
        default:
            styleToApply = style.Cheese;
    }
    return (
        <div className={styleToApply}/>
    );
}

export default ingredient;