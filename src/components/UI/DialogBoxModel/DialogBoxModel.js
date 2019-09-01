import React, { Component, Fragment } from 'react';
import style from './DialogBoxModel.module.css';
import Backdrop from '../Backdrop/Backdrop';

class DialogBox extends Component{
    shouldComponentUpdate=(nextProps, nextState)=>{
        return nextProps.show!==this.props.show;
    }
    render(){

        return (
            <Fragment>
                <Backdrop hideBackdrop={this.props.hideSummary} isVisible={this.props.show}/>
                <div className={style.Modal}
                    style={
                        {
                            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                            opacity: this.props.show ? "1" : "0"
                        }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default DialogBox;