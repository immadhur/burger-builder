import React from 'react';
import BuiidControl from './BuildControl/BuildControl';
import style from './BuildControls.module.css';

const buildControls=(props)=>{
    const controls=Object.keys(props.ingredients).map((ing)=>{
        return <BuiidControl ingredient={ing}
        key={ing}
        addIngred={()=>props.addIngred(ing)}
        removeIngred={()=>props.removeIngred(ing)}
        disable={props.disable[ing]}/>
    })

    let disableOrderButton=false;

    if(props.totalPrice===0)
        disableOrderButton=true;

        let btnText= props.isLoggedIn?'ORDER NOW':'SIGNUP TO CONTINUE';

    return(
        <div className={style.Body}>
            <p>Current Price: <strong>{props.totalPrice}</strong></p>
            {controls}
            <button onClick={props.showSummaryDialog} className={style.OrderButton} disabled={disableOrderButton}>{btnText}</button>
        </div>
    );
}

export default buildControls;