import React from 'react';

import FormControlContext from './form-control-context';

class FormControl extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            setValue: (name, value) => {
                this.setState({
                    [name]: value
                })
            }
        }
    }

    static getDerivedStateFromProps() {
        console.log("### Get Derived");
        return null;
    }

    shouldComponentUpdate() {
        console.log("### Should Compo");
        return true;
    }

    getSnapshotBeforeUpdate() {
        console.log("### Get Snapshot");
        return null;
    }

    componentDidUpdate() {
        console.log("### Did update");
    }

    componentDidMount() {
        console.log("### Did mount");
    }

    render() {
        const children = this.props.children;
        return (
            <FormControlContext.Provider value={this.state}>
            {
                typeof children == 'function' ? 
                children({
                    form: this.state
                }) : null
            }
            </FormControlContext.Provider>
        )
    }

}

export default FormControl;