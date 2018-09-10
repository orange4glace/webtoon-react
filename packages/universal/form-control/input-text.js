import React from 'react';

import FormControlContext from './form-control-context';
import withFormControl from './with-form-control';

class InputText extends React.Component {

    state = {}

    constructor(props) {
        super(props);
        console.log("Constructor..",props);
        this.state = {
            value: ''
        }
        this.props.control.setValue(this.props.name, this.props.value);
        console.log("Set done..");
    }

    componentDidMount() {
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
        console.log(this.props);
        return (
            <input
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                name={this.props.name} type='text' className={this.props.className} value={this.state.value} onChange={this.handleChange.bind(this)}/>
        )
    }

}

export default withFormControl(InputText);