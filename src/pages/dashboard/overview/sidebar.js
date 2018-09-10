import React from 'react';
import { matchPath } from 'react-router';
import { Link, Switch, Route } from 'react-router-dom';

import Localize from '../../../localize'
import { TABS } from './shared';
import style from './sidebar.scss';

class Sidebar extends React.Component {
    
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
        return (
            <div className={style.component}>
                {
                    TABS.map((el, i) => {
                        let classes = `item ${el.path == current_subpath ? 'active' : ''}`;
                        return (
                            <Link to={`${this.props.match.url}/${el.path}`} className={classes} key={i}>
                                <div className='icon' dangerouslySetInnerHTML={ {__html: el.icon } }></div>
                                <div className='label'><Localize>{el.name}</Localize></div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }

}

export default Sidebar;