import React from 'react';
import style from './NavigationItems.module.css';
import {NavLink} from 'react-router-dom';

const navItems=(props)=>{
    let styleToBeApplied;
    if(props.from==="toolbar")
        styleToBeApplied=style.Body;
    else
        styleToBeApplied=style.Body;
        return(
        <ul className={styleToBeApplied}>
            <li className={style.ListBody}><NavLink activeClassName={style.active} exact to='/'>Burger Builder</NavLink></li>
            <li className={style.ListBody}><NavLink activeClassName={style.active} to='/orders'>My Orders</NavLink></li>
        </ul>
        );
};

export default navItems;