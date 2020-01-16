import React, { Fragment } from 'react';
import style from './Order.module.css';

const order = (props) => (
    <div className={style.Body}>
        <div className={style.BodyLeft}>
            Ingredients:<strong>{Object.keys(props.order.ingredients).map(ingr => {
                return (
                    <Fragment key={ingr}>
                        <p className={style.Items} >{ingr} ({props.order.ingredients[ingr]})</p>
                        <div className={style.Pipe} />
                    </Fragment>);
            })}</strong><br /><br />
            Price: <strong>{props.price}/-</strong>
        </div>
        <div className={style.BodyRight}>
            <button onClick={props.deleteClick}>DELETE</button>
        </div>
    </div>
);

export default order;