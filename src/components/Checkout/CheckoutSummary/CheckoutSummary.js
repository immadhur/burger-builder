import React from 'react';
import Burger from '../../Burger/Burger'
import style from './CheckoutSummary.module.css';
const checkSummary=(props)=>{
    return(
        <div className={style.Body}>
            <h2>Have a great meal!</h2> 
            <Burger ingredients={props.ingredients}/>
            <button onClick={props.cancelClick} className={style.Cancel}>CANCEL</button>
            <button onClick={props.continueClick} className={style.Continue}>CONTINUE</button>
        </div>
    );
}

export default checkSummary;