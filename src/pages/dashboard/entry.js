import React from 'react';
import { Switch, Route } from 'react-router';
import { TransitionRoute, TransitionSwitch } from 'react-router-transition-pack';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import OverviewSidebar from './overview/sidebar';
import OverviewView from './overview/view';
import WebtoonSidebar from './webtoon/sidebar';
import WebtoonView from './webtoon/view';
import style from './entry.scss';

class Entry extends React.Component {

    componentWillUnmount() {
        console.log("Unmount Entry");
    }

    render() {
        return (
            <div className={style.component}>
                <div className='sidebar'>
                    <TransitionSwitch>
                        <TransitionRoute classNames='anim' path={`${this.props.match.url}/overview`} component={OverviewSidebar} timeout={1000}/>
                        <TransitionRoute classNames='anim' path={`${this.props.match.url}/webtoon`} component={WebtoonSidebar} timeout={1000}/>
                    </TransitionSwitch>
                </div>
                <div className='main'>
                    <TransitionSwitch>
                        <TransitionRoute classNames='anim' path={`${this.props.match.url}/overview`} component={OverviewView} timeout={1000}/>
                        <TransitionRoute classNames='anim' path={`${this.props.match.url}/webtoon`} component={WebtoonView} timeout={1000}/>
                    </TransitionSwitch>
                </div>
            </div>
        );
    }

}

export default Entry;