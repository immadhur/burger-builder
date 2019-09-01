import React, { Fragment } from 'react';
import style from './DialogBoxModel.module.css';
import Backdrop from '../Backdrop/Backdrop';

const dialogBox = (props) => (
    <Fragment>
        <Backdrop hideBackdrop={props.hideSummary} isVisible={props.show}/>
        <div className={style.Modal}
            style={
                {
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}>
            {props.children}
        </div>
    </Fragment>
);

export default dialogBox;