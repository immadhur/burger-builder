import React from 'react';
import style from './NavigationItems.module.css';
import { NavLink } from 'react-router-dom';

const navItems = (props) => {
    let styleToBeApplied;
    if (props.from === "toolbar")
        styleToBeApplied = style.ListBody;
    else
        styleToBeApplied = style.ListBodyMobile;
    let loginAction = props.isLoggedIn ?
        <li className={styleToBeApplied}>
            <NavLink activeClassName={style.active} to='/logout'>Logout</NavLink>
        </li>
        : <li className={styleToBeApplied}>
            <NavLink activeClassName={style.active} to='/login'>Login</NavLink>
        </li>

    return (
        <ul className={style.Body}>
            <li className={styleToBeApplied}>
                <NavLink activeClassName={style.active} exact to='/'>Burger Builder</NavLink>
            </li>
            {props.isLoggedIn?<li className={styleToBeApplied}>
                <NavLink activeClassName={style.active} to='/orders'>My Orders</NavLink>
            </li>:null}
            {loginAction}
        </ul>
    );
};

export default navItems;