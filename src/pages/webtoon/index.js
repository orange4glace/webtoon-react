import React from 'react';
import classNames from 'classnames';
import { withRouter, matchPath } from 'react-router';
import { Route, Switch, Link } from 'react-router-dom';

import Localize from '../../localize';
import ContentView from './content-view';
import TestView from './test-view';
import style from './style.scss';

let CATEGORIES = [
    {
        'value': 'life',
        'name': 'CATEGORY_LIFE',
        'component': ContentView,
    }, {
        'value': 'comic',
        'name': 'CATEGORY_COMIC',
        'component': TestView,
    }, {
        'value': 'story',
        'name': 'CATEGORY_STORY',
        'component': ContentView,
    }
]
class Page extends React.Component {

    constructor(props) {
        super(props)
        
        let match = matchPath(this.props.location.pathname, {
            path: '/webtoon/:genre',
            exact: true,
        });
        let category;
        if (match) {
            let sel = CATEGORIES.filter(el => el.value == match.params.genre);
            if (sel.length) category = match.params.genre;
        }
        if (!category) {
            console.log(this.props.location.pathname, "Genre doesn't exist. redirect to life");
            category = 'life';
            this.props.history.replace(`${this.props.match.url}/${category}`);
        }
        this.state = {
            category: category
        };
    }

    setCategory(category, replace) {
        console.log('Set category',category,replace);
        this.setState({
            category: category
        })
        if (replace) this.props.history.replace(`${this.props.match.url}/${category}`);
        else this.props.history.push(`${this.props.match.url}/${category}`);
    }

    render() {
        console.log("Webtoon index.js", JSON.parse(JSON.stringify(this.props)));
        return (
            <div className={style.component + ' centeralize'}>
                <ul className='category'>
                    {CATEGORIES.map((el, i) => {
                        let cn = classNames(
                            'item',
                            this.state.category == el.value ? 'active' : ''
                        );

                        return (
                            <li onClick={()=>this.setCategory(el.value)} className={cn} key={i}>
                                <Localize>{el.name}</Localize>
                                <div className='highlight'></div>
                            </li>
                        )
                    })}
                </ul>
                <Switch>
                    {CATEGORIES.map((el, i) => {
                        let cn = classNames(
                            'item',
                            this.category == el.value ? 'active' : ''
                        );

                        var path = `${this.props.match.url}/${el.value}`;
                        return (
                            <Route path={path} key={i} component={ContentView} key={i}/>
                        )
                    })}
                </Switch>
            </div>
        )
    }

}

export default Page;