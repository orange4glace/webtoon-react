import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import THUMBNAIL from './wide.jpg';

import { Request } from 'react-request-iron';
import { WEBTOON } from 'universal/mock'
import { Loading } from 'universal/loading';
import AppUtil from '../../app-util';
import Localize from '../../localize';
import WebtoonResource from '../../resources/webtoon-resource';
import style from './content-view.scss';

class ContentItem extends React.Component {

    render() {
        let inline_style = {
            backgroundImage: `url(${THUMBNAIL})`
        }
        return (
            <Link className='item' to={`/detail/${this.props.data.id}`}>
                <div className='thumbnail' style={inline_style}></div>
                <div className='bottom'>
                    <div className='title'>{this.props.data.title}</div>
                    <div className='category'>
                    {
                        AppUtil.bitToCategories(this.props.data.cate).map((el, i) => (
                            <span className='cate' key={i}><Localize>{el.name}</Localize></span>
                        ))
                    }
                    </div>
                </div>
            </Link>
        )
    }

}

class ContentView extends React.Component {

    constructor(props) {
        super(props);
        console.log("ContentView Constructor")
        this.state = {
            contents: null
        }
    }

    componentDidMount() {
        this.req = WebtoonResource.getWebtoons().then(result => {
            this.setState({
                contents: result.data
            });
        }).catch(error => {
            console.log("Failed to load")
        })
    }
    
    componentWillUnmount() {
        this.req.cancel();
    }

    render() {
        return (
        <div className={style.component}>
            <Request config={{}} mock={WEBTOON.GET_WEBTOONS}>
            {({response, error, loading}) => (
                response ? 
                (
                    response.data.map((el, i) => (
                        <ContentItem data={el} key={i}/>
                    ))
                ) : error ?
                (
                    <div>ERROR</div>
                ) : loading ?
                (
                    <Loading/>
                ) : null
            )}
            </Request>
        </div>
        )
        /*
        let content = null;
        if (this.state.contents) {
            content = this.state.contents.map((el, i) => (
                <ContentItem data={el} key={i}/>
            ))
        }

        return (
            <div className={style.component}>
                {content}
            </div>
        )
        */
    }

}

export default withRouter(ContentView);