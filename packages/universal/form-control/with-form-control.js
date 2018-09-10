import React from 'react';
import FormControlContext from './form-control-context';

function withFormControl(Component) {
    return (props) => (
        <FormControlContext.Consumer>
        {control => (
            <Component {...props} control={control}/>
        )}
        </FormControlContext.Consumer>
    )
}

export default withFormControl;