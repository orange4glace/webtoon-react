import React from 'react';
import { withRouter, matchPath } from 'react-router';

import WebtoonResource from '../../resources/webtoon-resource';
import style from './style.scss';

class Page extends React.Component {

    constructor(props) {
        super(props);
        let match = matchPath(this.props.location.pathname, {
            path: '/detail/:webtoon_id',
            exact: true,
        });
        if (!match) this.props.history.replace('/');
        console.log("Match Detail Page",match);
        this.state = {
            webtoon_id: match.params[0],
            webtoon: null
        }
    }

    componentDidMount() {
        this.req = WebtoonResource.getWebtoon(this.state.webtoon_id).then(result => {
            console.log(result);
            this.setState({
                webtoon: result.data
            })
        }).catch(err => {

        })
    }

    componentWillUnmount() {
        this.req.cancel();
    }

    render() {
        if (this.state.webtoon) {
            let webtoon = this.state.webtoon;
            return (
                <div className={style.component + ' centeralize'}>
                    <div className='overview'>
                        <div className='description'>
                            <div className='title'>{webtoon.title}</div>
                            <div className='writer'></div>
                        </div>
                        <div className='thumbnail' style={{
                            backgroundImage: `url(${webtoon.thumbnail})`
                        }}/>
                    </div>
                    <ul className='list'>
                        <li className='item'>
                            <div className='thumbnail'/>
                            <div className='title'></div>
                        </li>
                    </ul>
                </div>
            )
        }
        else return (<div/>)
    }

}

export default Page;