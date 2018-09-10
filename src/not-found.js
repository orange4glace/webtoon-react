import React from 'react';
import { Redirect } from 'react-router-dom'
/*
export default function({ location }) {
    return (
        <Redirect to={{
            pathname: location.pathname,
            state: {
                notFound: true
            }
        }}/>
    )
}
*/
export default function({ location }) {
    return 'NOT_FOUND';
}