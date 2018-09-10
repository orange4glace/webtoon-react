import React from 'react';

const I18N = {
    'NAV_WEBTOON': {
        'ko': '웹툰',
        'en': 'Webtoon',
    },
    'NAV_LATEST': {
        'ko': '최신 작품',
        'en': 'Latest',
    },
    'CATEGORY_LIFE': {
        'ko': '일상',
    },
    'CATEGORY_COMIC': {
        'ko': '코믹',
    },
    'CATEGORY_STORY': {
        'ko': '스토리'
    },
    'DASHBOARD_TAB_WEBTOON': {
        'ko': '내 작품'
    },
    'DASHBOARD_WEBTOON_LIST_ADD_NEW_ITEM': {
        'ko': '새 작품 추가'
    },
    'DASHBOARD_WEBTOON_LIST_EMPTY_LIST': {
        'ko': '내 첫 작품을 등록해보세요!'
    }
};

const LocalizationContext = React.createContext({
    lang: 'ko',
    setLanguage: function(lang) {
        console.log(this);
    },
    localize: (key, lang) => {
        if (I18N[key]) return I18N[key][lang];
        return key;
    }
});

function withLocalization(Component) {
    return function LocalizedComponent(props) {
        return (
            <LocalizationContext.Consumer>
                {opt => <Component {...props} localizer={opt}/>}
            </LocalizationContext.Consumer>
        )
    }
}

function Localized_(props) {
    return '' + props.localizer.localize(props.children, props.localizer.lang)
}

let Localized = withLocalization(Localized_);

export { Localized };