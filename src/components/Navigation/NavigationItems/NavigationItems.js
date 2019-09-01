import React from 'react';
import style from './NavigationItems.module.css';

const navItems=(props)=>{
    let styleToBeApplied;
    if(props.from==="toolbar")
        styleToBeApplied=style.Body;
    else
        styleToBeApplied=style.Body;
        return(
        <ul className={styleToBeApplied}>
            <li className={style.ListBody}><a href='/'>Burger Builder</a></li>
            <li className={style.ListBody}><a href='/'>My Profile</a></li>
            <li className={style.ListBody}><a href='/'>Checkout</a></li>
        </ul>
        );
};

export default navItems;