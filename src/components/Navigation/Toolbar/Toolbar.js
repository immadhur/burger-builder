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
        <h3>Burger Builder</h3>
        <nav className={style.DisplayNav}>
            <NavItems from="toolbar" />
        </nav>
    </div>
);

export default toolbar;