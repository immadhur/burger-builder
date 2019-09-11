import React, {Fragment} from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import style from './Burger.module.css';

const burger=(props)=>{
     const sumOfIngrefients=Object.entries(props.ingredients).length?Object.values(props.ingredients).reduce((acc, curr)=>acc+curr):0;
    let ingredients=<Fragment/>
    if(sumOfIngrefients===0){
        ingredients=(
            <Fragment>
                <p>Please add ingredients!</p>
            </Fragment>
        );
    }
    else{
        console.log('NEW!!')
        ingredients=Object.entries(props.ingredients).map((item)=>{
            console.log(item);
        return [...Array(item[1])].map((_, i)=>{
            console.log(i, item[0]);
            return <BurgerIngredients key={item[0]+i} type={item[0]}/>
        })
    })
    }
    return (
        <div className={style.Body}>
            <BurgerIngredients type='top'/>
            {ingredients}
            <BurgerIngredients type='bottom'/>
        </div>
    );
}

export default burger;