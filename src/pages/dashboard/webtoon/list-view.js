import React from 'react';

import { DETAIL_GET_LIST } from 'universal/mock/dashboard.js';
import { Get } from 'react-request-iron';
import { Loading } from 'universal/loading';
import style from './list-view.scss';

class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: null,
        };
    }

    render() {
        console.log(Get);
        return (
            <div className={style.component}>
                <div className='table-header'>
                    <div className='table-column title'>Title</div>
                    <div className='table-column date'>Date</div>
                    <div className='table-column views right-align'>Views</div>
                    <div className='table-column likes right-align'>Likes</div>
                </div>
                <Get mock={DETAIL_GET_LIST}>
                {({response, error, loading}) => (
                    response ?
                        response.data.map((el, i) => (
                            <li className='table-item' key={el.id}>
                                <div className='table-column title'>{el.title}</div>
                                <div className='table-column date'>{el.date}</div>
                                <div className='table-column views right-align'>{el.views}</div>
                                <div className='table-column likes right-align'>{el.likes}</div>
                            </li>
                        )) :
                    error ?
                        <div>ERROR</div> :
                    loading ?
                        <Loading/> :
                    null
                )}
                </Get>
            </div>
        )
    }

}

export default View;