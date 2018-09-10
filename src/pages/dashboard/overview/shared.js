import WebtoonListView from './webtoons-view';
import WriteView from './write-view';

import ICON_TAB_WEBTOON from '../../../../resources/icons/baseline-collections-24px.svg';
    
const TABS = [
    {
        path: 'write',
        icon: null,
        name: 'DASHBOARD_TAB_OVERVIEW_WRITE',
        component: WriteView
    }, {
        path: 'webtoons',
        icon: ICON_TAB_WEBTOON,
        name: 'DASHBOARD_TAB_WEBTOON',
        component: WebtoonListView
    },
];

export {
    TABS
}