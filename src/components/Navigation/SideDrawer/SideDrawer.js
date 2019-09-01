import React, { Fragment } from 'react';
import style from './SideDrawer.module.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let styleToBeApplied = [style.Body, style.Open];
    if (props.isVisible === false)
        styleToBeApplied = [style.Body, style.Close];

    return (
        <Fragment>
            <Backdrop isVisible={props.isVisible} hideBackdrop={props.hideBackdrop} />
            <div className={styleToBeApplied.join(' ')}>
                <div className={style.Logo}>
                    <Logo />
                </div>
                <NavItems from="sidedrawer" />
            </div>
        </Fragment>
    );
}

export default sideDrawer;