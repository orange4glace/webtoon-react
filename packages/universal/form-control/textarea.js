import React from 'react';

class InputText extends React.Component {

    state = {}

    componentDidMount() {
        this.props.control.setState(this.props.name, {
            value: this.props.value 
        });
    }
    
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        this.props.control.setState(this.props.name, {
            value: value
        })
    }

    render() {
        return (
            <textarea name={this.props.name} type='text' className={this.props.className} value={this.props.value} onChange={this.handleChange.bind(this)}/>
        )
    }

}

export default InputText;