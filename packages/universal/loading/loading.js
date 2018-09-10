import React from 'react';

import { LoadingConsumer } from './loading-context';

class LoadingInner extends React.Component {

    constructor(props) {
        super(props);
        let key = props.value || parseInt(Date.now() * Math.random())

        this.state = {
            key: key
        }
    }

    componentDidMount() {
        this.props.loading.addLoading(this.state.key);
    }

    componentWillUnmount() {
        this.props.loading.removeLoading(this.state.key);
    }

    render() {
        return null;
    }

}

const Loading = (props) => (
    <LoadingConsumer>
    {context =>
        <LoadingInner {...props} loading={context}/>
    }
    </LoadingConsumer>
)

export default Loading;