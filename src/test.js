import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { CSSTransition } from 'react-transition-group';

import { TransitionRoute, TransitionRouteFactory, TransitionSwitch } from 'react-router-transition-pack';

import style from './test.scss';

var id = 0;

const context = React.createContext({});

class B extends React.Component {

    render() {
        console.log(JSON.parse(JSON.stringify(this.props)));
        return <div>HIYO</div>;
    }
}
const C = withRouter(B);

class A extends React.Component {

    render() {
        return <C/>;
    }

}

class _Test extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.parse(JSON.stringify(props)));
        this.id = 'B';
        this.state = {
            id: 'B',
            value: 0,
            SET: val => this.setState({
                value: val
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("Get Derived State", prevState.id, nextProps, prevState.value);
        return null;
    }

    route() {
        let path = prompt();
        this.props.history.push(path);
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.route()}>BUTTON</button>
                <TransitionSwitch>
                    <TransitionRoute timeout={3000} classNames='a' path='/hello' render={()=>(<div>HI</div>)}/>
                    <TransitionRoute timeout={500000} classNames='trans' path='/yap' component={A}/>
                </TransitionSwitch>
            </div>
        )
    }

}

const Test = withRouter(_Test);
class TestApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Test/>
                </Router>
            </React.Fragment>
        )
    }
}

/*
class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
        setInterval(() => {
            this.setState({
                id: Date.now()
            })
        }, 100000)
    }

    render() {
        return (
            <context.Provider value={this.state}>
                <B>
                    <context.Consumer>
                        {context => (
                            <A context={context}/>
                        )}
                    </context.Consumer>
                </B>
            </context.Provider>
        )
    }

}

*/

export default TestApp;