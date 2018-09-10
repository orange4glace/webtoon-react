import React from 'react';

import withFormControl from './with-form-control';

class Checkbox extends React.Component {

    state = {}

    constructor(props) {
        super(props);
        this.state = {
            value: false
        }
        this.props.control.setValue(this.props.name, this.props.value);
    }
    
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        let transformed = (this.props.onValueChange && this.props.onValueChange(value)) || value;
        this.props.control.setValue(this.props.name, transformed);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            value: nextProps.control[nextProps.name]
        }
    }


    render() {
        return (
            <input type='checkbox'
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                name={this.props.name} className={this.props.className} chekced={this.state.value} onChange={this.handleChange.bind(this)}/>
        )
    }

}

export default withFormControl(Checkbox);