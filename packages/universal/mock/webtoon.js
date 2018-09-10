export default {
    GET_WEBTOONS: () => (
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
    ),
    GET_WEBTOON: () => (
        {
            title: '세기말 반찬가게',
            cate: (1 << 0) | (1 << 2),
            thumbnail: 'https://cdn.lezhin.com/v2/comics/4784440947245056/images/wide?updated=1532417521157&width=1200',
        }
    )
}