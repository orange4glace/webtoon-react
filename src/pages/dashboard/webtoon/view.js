import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Localize from '../../../localize'
import NotFound from '../../../not-found';
import style from './view.scss';
import { TABS } from './shared';

class View extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className={style.component}>
                <Switch>
                    {
                        TABS.map((el, i) => {
                            return (
                                <Route exact path={`${this.props.match.url}/:webtoon_id/${el.path}`} component={el.component} key={i}/>
                            )
                        })
                    }
                    <Route component={NotFound}/>
                </Switch>
            </div>
        )
    }

}

export default View;