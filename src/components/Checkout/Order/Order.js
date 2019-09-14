import React, {Fragment} from 'react';
import style from './Order.module.css';

const order = (props) => (
    <div className={style.Body}>
        Ingredients:<strong>{Object.keys(props.order.ingredients).map(ingr => {
            return (
                <Fragment>
                    <p className={style.Items}>{ingr} ({props.order.ingredients[ingr]})</p>
                    <div className={style.Pipe} />
                </Fragment>);
        })}</strong><br /><br />
        Price: <strong>{props.price}/-</strong>
    </div>
);

export default order;