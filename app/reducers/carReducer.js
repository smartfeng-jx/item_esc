const initState = {
    'page': 1,
    'pagesize': 10,
    'color': [],
    'exhaust': [],
    'engine': [],
    'gearbox': [],
    'fuel': [],
    'km': [],
    'price': [],
    'buydate': [],
    'sortby': 'id',
    'sortdirection': 1,
    'total': 0,
    'results': []
};

var R = require('ramda');

export default (state = initState, action) => {

    if(action.type === 'LOADDATA_'){
        const o1 = R.set(R.lensProp('results'), action.results, state);
        const o2 = R.set(R.lensProp('total'), action.total, o1);
        return o2;
    }else if(action.type === 'CHANGEPAGE_'){
        return R.set(R.lensProp('page'), action.page, state);
    }else if(action.type === 'CHANGEPAGESIZE_'){
        return R.set(R.lensProp('pagesize'), action.pagesize, state);
    }else if(action.type === 'CHANGEFILTER_'){
        return R.set(R.lensProp(action.k), action.v, state);
    }else if(action.type === 'CHANGESORTBY_'){
        return R.set(R.lensProp('sortby'), action.sortby, state);
    }else if(action.type === 'CHANGESORTDIRECTION_'){
        return R.set(R.lensProp('sortdirection'), action.sortdirection, state);
    }else if(action.type === 'CLEAR'){
        return initState;
    }
    return state;
}