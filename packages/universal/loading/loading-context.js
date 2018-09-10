import React from 'react';

const Context = React.createContext({});
const LoadingConsumer = Context.Consumer;

class LoadingProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loads: {},
            loadCount: 0,
            addLoading: (key) => {
                key = key || parseInt(Date.now() * Math.random())
                this.setState((prevState, props) => {
                    let nextLoads = {...prevState.loads}
                    let nextLoadCount = prevState.loadCount;
                    if (!(key in nextLoads)) {
                        nextLoads[key] = 1;
                        nextLoadCount++;
                    }
                    return {
                        loads: nextLoads,
                        loadCount: nextLoadCount
                    }
                });
                return key;
            },
            removeLoading: (key) => {
                this.setState((prevState, props) => {
                    let nextLoads = {...prevState.loads};
                    let nextLoadCount = prevState.loadCount;
                    if (key in nextLoads) {
                        delete nextLoads[key];
                        nextLoadCount--;
                    }
                    return {
                        loads: nextLoads,
                        loadCount: nextLoadCount
                    }
                });
            }
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }

}

export {
    LoadingConsumer,
    LoadingProvider
}