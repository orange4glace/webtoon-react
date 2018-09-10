import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { withRouter, matchPath } from 'react-router';

import { LoadingConsumer } from 'universal/loading';
import NavigatorItem from './navigator-item';
import style from './navigator.scss';

class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.ITEMS = [
            {
                name: 'NAV_WEBTOON',
                link: '/webtoon'
            }, {
                name: 'NAV_LATEST',
                link: '/latest'
            }
        ]
    }

    render() {
        return (
            <div className={style.component}>
                <div className='inner'>
                    <div className='content'>
                        {
                            this.ITEMS.map((el, i) => {
                                let match = matchPath(this.props.location.pathname, {
                                    path: el.link,
                                    exact: false,
                                });
                                return (
                                    <NavigatorItem active={match} link={el.link} name={el.name} key={i}></NavigatorItem>
                                )
                            })
                        }
                    </div>
                </div>
                <LoadingConsumer>
                {loading => (
                    loading.loadCount ? <div className='loading-bar'/> : null
                )}
                </LoadingConsumer>
            </div>
        );
    }
}

export default withRouter(Navigator)