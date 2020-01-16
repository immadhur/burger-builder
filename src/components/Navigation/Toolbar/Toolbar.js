import React from 'react';
import style from './Toolbar.module.css';
import NavItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <div className={style.Body}>
        <div onClick={props.showSideDrawer} className={style.SideDrawerToggle}>
            <div/>
            <div/>
            <div/>
        </div>
        <div className={style.AppName}>Burger Builder</div>
        <nav className={style.DisplayNav}>
            <NavItems isLoggedIn={props.isLoggedIn} from="toolbar" />
        </nav>
    </div>
);

export default toolbar;