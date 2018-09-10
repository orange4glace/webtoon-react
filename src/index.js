import React from 'react';
import ReactDOM from 'react-dom';
import Navigator from './components/navigator';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import {
    TransitionRoute,
    TransitionSwitch,
} from 'react-router-transition-pack';
import { connect, Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { RequestContext } from 'react-request-iron'

import { UserProvider } from './contexts/user';
import { LoadingProvider, LoadingConsumer } from 'universal/loading'

import WebtoonPage from './pages/webtoon';
import DetailPage from './pages/detail';
import DashboardEntry from './pages/dashboard/entry';
import NotFound from './not-found';
import style from './style.scss';


const store = createStore(rootReducer);

class Header extends React.Component {
    render() {
        return (
            <div className={style.header}>
                <Navigator/>
            </div>
        )
    }
}

const App = (props) => {
    console.log(props);
    return (
        <TransitionSwitch>
            <TransitionRoute classNames='anim' timeout={1000} name='webtoon' path='/webtoon' component={WebtoonPage}/>
            <TransitionRoute classNames='anim' timeout={1000} name='detail' path='/detail/:webtoon_id' component={DetailPage}/>
            <TransitionRoute classNames='anim' timeout={1000} name='dashboard' path='/dashboard' component={DashboardEntry}/>
            <TransitionRoute classNames='anim' timeout={1000} name='not-found' component={NotFound}/>
        </TransitionSwitch>
    )}

const Global404 = () => (
  <div>
    <h1>Oh, no!</h1>
    <p>You weren't supposed to see this... it was meant to be a surprise!</p>
  </div>
)

import TestApp from './test';

ReactDOM.render(
    <ReduxProvider store={store}>
    <RequestContext.Provider value={{
        mock: true,
        mockFail: 0,
        mockDelay: 3000
    }}>
    <LoadingProvider>
    <UserProvider>
    <Router>
        <div className='_container'>
            <Header></Header>
            <LoadingConsumer>
                {loading => {
                    console.log(loading);
                    return null;
                }}
            </LoadingConsumer>
            <div className='_body transition-container transition-fade'>
                <Route name='app' render={(props) => (
                    props.location.state && props.location.state.notFound ?
                    <Global404/> : <App {...props}/>
                )}/>
            </div>
        </div>
    </Router>
    </UserProvider>
    </LoadingProvider>
    </RequestContext.Provider>
    </ReduxProvider>,
    document.getElementById('app')
)