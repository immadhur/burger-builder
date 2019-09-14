import React, { Component } from 'react';

class Input extends Component {

    render() {
        let inputElement = null;
        const input = this.props.inputType;
        switch (input) {
            case ('input'):
                inputElement = <input {...props} />
                break;
            case ('textArea'):
                inputElement = <textarea {...this.props} />
                break;
            default:
                inputElement = <input {...props} />

        }
        return (
            <div>
                <label>{this.props.label}</label>
                {inputElement}
            </div>
        );
    }
}

export default Input;