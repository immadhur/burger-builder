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
            <Backdrop isVisible={props.isVisible} click={props.click} />
            <div className={styleToBeApplied.join(' ')} onClick={props.click}>
                <div className={style.Logo}>
                    <Logo />
                </div>
                <NavItems isLoggedIn={props.isLoggedIn} from="sidedrawer" />
            </div>
        </Fragment>
    );
}

export default sideDrawer;