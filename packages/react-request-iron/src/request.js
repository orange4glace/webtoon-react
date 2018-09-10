import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import RequestContext from './request-context';

function RequestSuccess(props) {
    if (typeof props.children == 'function') 
        return props.children(props)
    const child = React.Children.only(props.children);
    return React.cloneElement(child, props);
}

function RequestCatch(props) {
    if (typeof props.children == 'function') 
        return props.children(props)
    const child = React.Children.only(props.children);
    return React.cloneElement(child, props);
}

function RequestFetching(props) {
    if (typeof props.children == 'function') 
        return props.children(props)
    const child = React.Children.only(props.children);
    return React.cloneElement(child, props);
}

class RequestInner extends React.Component {

    static propTypes = {
        config: PropTypes.object,
        mock: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            state: 'none',
            request: null,
            cancel: null,
            response: null,
            error: null,
        }
    }

    componentDidMount() {
        if (!this.props.requestContext.mock) {
            let cancel = axios.CancelToken.source();
            let req = axios({
                ...this.props.config,
                cancelToken: cancel.token
            }).then(response => {
                this.setState({
                    state: 'done',
                    response: response
                });
            }).catch(err => {
                this.setState({
                    state: 'catch',
                    error: err
                })
            });
            this.setState({
                state: 'load',
                request: req,
                cancel: cancel.cancel
            })
        }

        else {
            let tl = setTimeout(() => {
                if (Math.random() > this.props.requestContext.mockFail) {
                    this.setState({
                        state: 'done',
                        response: {
                            data: this.props.mock()
                        }
                    })
                }
                else {
                    this.setState({
                        state: 'catch',
                        error: 'mock-err'
                    })
                }
            }, this.props.requestContext.mockDelay);
            this.setState({
                state: 'load',
                request: tl,
                cancel: ()=>{clearTimeout(tl)}
            })
        }
    }

    componentWillUnmount() {
        if (this.state.cancel) this.state.cancel();
    }

    render() {
        let acceptType;
        let children = this.props.children;
        let childProps = {
            response: this.state.response,
            error: this.state.error,
            loading: this.state.state == 'load'
        };
        if (typeof children == 'function')
            return children(childProps);
        const child = React.Children.only(children);
        return React.cloneElement(child, childProps);
    }

}

const Request = props => (
    <RequestContext.Consumer>
    {context => {
        return (
        <RequestInner {...props} requestContext={context}/>
        )
    }}
    </RequestContext.Consumer>
)

Request.Success = RequestSuccess;
Request.Catch = RequestCatch;
Request.Fetch = RequestFetching;

export default Request;