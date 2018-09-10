const CATEGORIES = [
    {
        value: 'life',
        name: 'CATEGORY_LIFE',
        bit: 0,
    }, {
        value: 'comic',
        name: 'CATEGORY_COMIC',
        bit: 1,
    }, {
        value: 'story',
        name: 'CATEGORY_STORY',
        bit: 2,
    }
]

const WEBTOON_TYPES = [
    {
        value: 0,
        name: 'WEBTOON_TYPE_LONG'
    }, {
        value: 1,
        name: 'WEBTOON_TYPE_SHORT'
    }
]

function bitToCategories(bit) {
    return CATEGORIES.filter(cate => cate.bit & bit);
}

function intToWebtoonType(val) {
    let t = WEBTOON_TYPES.filter(type => type.value == val);
    return t.length ? t[0] : '';
}

export default {
    CATEGORIES,
    bitToCategories,
    intToWebtoonType,
}