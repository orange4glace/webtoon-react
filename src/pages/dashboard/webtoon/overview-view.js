import React from 'react';

import style from './overview-view.scss';

class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: null,
        };
    }

    render() {
        return (
            <div className={style.component}>
                <div className='table-header'>
                    <div className='table-column title'>Title</div>
                    <div className='table-column date'>Date</div>
                    <div className='table-column views right-align'>Views</div>
                    <div className='table-column likes right-align'>Likes</div>
                </div>
            {
                this.state.list ? 
                this.state.list.length ?
                <React.Fragment>
                    {
                        (
                            this.state.list.map((el, i) => (
                                <li className='table-item' key={el.id}>
                                    <div className='table-column title'>{el.title}</div>
                                    <div className='table-column date'>{el.date}</div>
                                    <div className='table-column views right-align'>{el.views}</div>
                                    <div className='table-column likes right-align'>{el.likes}</div>
                                </li>
                            ))
                        )
                    }
                </React.Fragment>
                :
                <div className='empty-list'>
                    <div><Localize>DASHBOARD_WEBTOON_DETAIL_EMPTY_LIST</Localize></div>
                </div>
                :
                null
            }
            </div>
        )
    }

}

export default View;