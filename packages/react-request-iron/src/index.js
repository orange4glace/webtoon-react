import React from 'react';
import Request from './request'

function wrap(wrapProps) {
    return props => {
        let pass = {
            ...props,
            ...wrapProps
        } 
        return (
            <Request {...pass}>{props.children}</Request>
        )
    }
}

const Get = wrap({
    method: 'get'
});
export {default as Request} from './request.js';
export {
    Get
};
export {default as RequestContext} from './request-context.js';
