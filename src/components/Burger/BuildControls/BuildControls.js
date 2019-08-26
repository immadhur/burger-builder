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

    return(
        <div className={style.Body}>
            <p>{props.totalPrice}</p>
            {controls}
        </div>
    );
}

export default buildControls;