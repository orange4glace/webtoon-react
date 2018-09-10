import axios from 'axios';

const CancelToken = axios.CancelToken;

const BASE_URL = 'BASE_URL';

var Resource = {
    useMock: true,
    withBase: (...args) => {
        var query = '';
        for (var i = 0; i < args.length; i ++)
            query += '/' + args[i] ;
        return BASE_URL + query;
    }
}

Resource.Request = (url, opt = {}) => {
    var cancel;
    opt = {...opt, 
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    };
    var promise = axios.request(opt);
    promise.cancel = cancel;
    return promise;
}

Resource.Get = (url, opt = {}) => {
    var cancel;
    var pr = axios.get(url, {
        ...opt,
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
        })
    });
    pr.cancel = cancel;
    return pr;
}

Resource.Post = (url, opt = {}) => {
    return axios.post(url, opt)
}

Resource.MockResult = (data, delay = 500, failRatio = 0)  => {
    var promise = {
        thenFunc: ()=>{},
        catchFunc: ()=>{},
        then: function(func) {
            this.thenFunc = func;
            return this;
        },
        catch: function(func) {
            this.catchFunc = func;
            return this;
        },
    }
    var tl = setTimeout(() => {
        console.log(promise);
        if (Math.random() > failRatio)
            promise.thenFunc({data:data});
        else
            promise.catchFunc('mock-error');
    }, delay);
    promise.cancel = () => {
        clearTimeout(tl);
    }
    return promise;
}

export default Resource;