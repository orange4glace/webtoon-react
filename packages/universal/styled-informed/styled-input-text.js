import React from 'react';

import { Text } from 'informed';
import { Localized } from 'universal/localize';
import style from './styled-input-text.scss';

class StyledInputText extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            focus: false,
            max: false,
        }

        this.validate = this.validate.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
    }

    validate() {
        let value = this.props.form.getValue(this.props.field);
        let maxLength = this.props.maxLength || Infinity
        if (value.length >= this.props.maxLength) {
            value = value.slice(0, maxLength);
            this.props.form.setValue(this.props.field, value);
        }
        this.setState({
            value: value,
            max: value.length >= this.props.maxLength
        })
        return value;
    }

    focusHandler() {
        this.setState({
            focus: true
        })
    }

    blurHandler() {
        this.setState({
            focus: false
        })
    }

    render() {
        return (
            <div className={style.component}
                focus={this.state.focus ? 1 : undefined}
                max={this.state.max ? 1 : undefined}>
                <div className='container'>
                    <div className='max-length'>{this.state.value.length}/{this.props.maxLength}</div>
                    <div className='input'>
                        { this.state.value.length == 0 &&
                        <div className='placeholder'>
                            <Localized>PLACEHOLDER_TITLE</Localized>
                        </div>
                        }
                        <Text field={this.props.field}
                            onChange={this.validate}
                            onFocus={this.focusHandler}
                            onBlur={this.blurHandler}/>
                    </div>
                    <div className='deco'>
                        <div className='underline'/>
                        <div className='underline-highlight'/>
                    </div>
                </div>
            </div>
        )
    }

}

export default StyledInputText;