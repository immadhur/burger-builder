import React from 'react';
import style from './BuildControl.module.css'

const buildControl=(props)=>{
    const label=props.ingredient
    return(
        <div className={style.Body}>
            <div className={style.Body1}>
            <p className={style.Label}>{label.charAt(0).toUpperCase() + label.slice(1)}</p>
            <button className={style.Less} onClick={props.removeIngred} disabled={props.disable}>-</button>
            <button className={style.More} onClick={props.addIngred}>+</button>
        </div>
        </div>
    );
}

export default buildControl;