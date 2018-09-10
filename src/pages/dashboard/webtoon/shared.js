import OverviewView from './overview-view';
import ListView from './list-view';
import WriteView from './write-view';
    
const TABS = [{
        path: 'write',
        icon: null,
        name: 'DASHBOARD_WEBTOON_WRITE',
        component: WriteView
    },
    {
        path: 'overview',
        icon: null,
        name: 'DASHBOARD_WEBTOON_SIDEBAR_OVERVIEW',
        component: OverviewView
    }, {
        path: 'list',
        icon: null,
        name: 'DASHBOARD_WEBTOON_SIDEBAR_LIST',
        component: ListView
    },
];

export {
    TABS
}