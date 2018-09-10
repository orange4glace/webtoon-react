import React from 'react';
import { Link } from 'react-router-dom';

import useDashboardResource from './../../../resources/dashboard-resource';
import Localize from '../../../localize';
import style from './webtoons-view.scss';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            webtoons: null
        }
    }

    componentDidMount() {
        this.props.DashboardResource.getWebtoons().then(result => {
            this.setState({
                webtoons: result.data
            });
        }).catch(err => {

        });
    }

    render() {
        return (
            <div className={style.component}>
                <div className='table-header'>
                    <div className='table-column title'>Title</div>
                    <div className='table-column visibility'>Visibility</div>
                    <div className='table-column date'>Date</div>
                    <div className='table-column views right-align'>Views</div>
                    <div className='table-column likes right-align'>Likes</div>
                </div>
            {
                this.state.webtoons ? 
                this.state.webtoons.length ?
                <React.Fragment>
                    {
                        (
                            this.state.webtoons.map((el, i) => (
                                <Link to={`/dashboard/webtoon/${el.id}/list`} className='table-item' key={el.id}>
                                    <div className='table-column title'>{el.title}</div>
                                    <div className='table-column visibility'>{el.visibility}</div>
                                    <div className='table-column date'>{el.date}</div>
                                    <div className='table-column views right-align'>{el.views}</div>
                                    <div className='table-column likes right-align'>{el.likes}</div>
                                </Link>
                            ))
                        )
                    }
                </React.Fragment>
                :
                <div className='empty-list'>
                    <div><Localize>DASHBOARD_WEBTOON_LIST_EMPTY_LIST</Localize></div>
                </div>
                :
                null
            }
            </div>
        )
    }

}

export default 
useDashboardResource(
    View
);