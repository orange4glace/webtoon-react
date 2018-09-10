const localize = (state = {
    lang: 'ko'
}, action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                lang: action.lang
            }
        default:
            return state;
    }
}

export default localize;