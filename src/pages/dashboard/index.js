import React from 'react';
import { matchPath, withRouter } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';

import WebtoonListView from './webtoon_list_view';
import Localize from '../../localize'
import NotFound from '../../not-found';
import style from './style.scss';

import ICON_TAB_WEBTOON from '../../../resources/icons/baseline-collections-24px.svg';

class Page extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props);
    }

    getSubpath() {
        let match = matchPath(this.props.location.pathname, {
            path: `${this.props.match.url}/:tab`,
            exact: true,
        });
        return match ? match.params[0] : null;
    }

    render() {
        let current_subpath = this.getSubpath();
        let TABS = [
            {
                path: 'webtoons',
                icon: ICON_TAB_WEBTOON,
                name: 'DASHBOARD_TAB_WEBTOON',
                component: WebtoonListView
            },
        ]
        return (
            <div className={style.component}>
                {
                    TABS.map((el, i) => {
                        let classes = `tab ${el.path == current_subpath ? 'active' : ''}`;
                        return (
                            <Link to={`${this.props.match.url}/${el.path}`} className={classes} key={i}>
                                <div className='item'>
                                    <div className='icon' dangerouslySetInnerHTML={ {__html: el.icon } }></div>
                                    <div className='label'><Localize>{el.name}</Localize></div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div className='main'>
                    <Switch>
                        {
                            TABS.map((el, i) => {
                                return (
                                    <Route exact path={`${this.props.match.url}/${el.path}`} component={el.component} key={i}/>
                                )
                            })
                        }
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        )
    }

}

export default 
withRouter(
    Page
);