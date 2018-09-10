import Resource from  './index';

let getWebtoons, getWebtoon;

getWebtoons = !Resource.useMock ? 
(genre, pagination) => {
    console.log(Resource.withBase(genre, pagination));
    return Resource.Get(Resource.withBase(genre, pagination));
} :
(genre, pagination) => {
    return Resource.MockResult(
        [
            {
                title: '우리 사이는',
                cate: (1 << 0) | (1 << 1)
            }, {
                title: 'Hello World!',
                cate: (1 << 0) | (1 << 1)
            }, {
                title: 'Hello World!',
                cate: (1 << 0) | (1 << 1)
            }, {
                title: 'Hello World!',
                cate: (1 << 0) | (1 << 1)
            }, {
                title: 'Hello World!',
                cate: (1 << 0) | (1 << 1)
            }, {
                title: 'Hello World!',
                cate: (1 << 0) | (1 << 1)
            }
        ]
    )
};

getWebtoon = (webtoon_id) => {
    return !Resource.useMock ? 
        Resource.Get(Resource.withBase('webtoon', webtoon_id)) :
        Resource.MockResult({
            title: '세기말 반찬가게',
            cate: (1 << 0) | (1 << 2),
            thumbnail: 'https://cdn.lezhin.com/v2/comics/4784440947245056/images/wide?updated=1532417521157&width=1200',
        })
    }

export default { 
    getWebtoons,
    getWebtoon
};