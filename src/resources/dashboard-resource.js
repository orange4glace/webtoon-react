import React from 'react';

import Resource from  './index';

import { withUser } from './../contexts/user';

var getWebtoons = function(user) {
    return !Resource.useMock ? 
        Resource.Get(Resource.withBase('webtoon', webtoon_id)) :
        Resource.MockResult([
            {
                id: '1',
                title: '도망치는건 부끄럽지만 도움이 된다',
                visibility: false,
                date: '2013-03-01',
                views: 1004,
                likes: 592
            }
        ])
}

const DashboardResource = user => ({
    getWebtoons: ()=>getWebtoons(user)
})

function useDashboardResrouce(Component) {
    return withUser(function _(props) {
        return (
            <Component DashboardResource={DashboardResource(props.user)} {...props}/>
        )
    })
}


export default useDashboardResrouce;