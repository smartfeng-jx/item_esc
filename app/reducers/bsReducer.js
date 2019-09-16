var R = require('ramda');

export default (state = {'allbs': {}, 'brand': '', 'series': ''}, action) => {
    if(action.type === 'LOADALLBS_'){
        return R.set(R.lensProp('allbs'), action.allbs, state);
    }else if(action.type === 'CHANGEBRAND_'){
        return R.set(R.lensProp('brand'), action.brand, state);
    }else if(action.type === 'CHANGESERIES_'){
        return R.set(R.lensProp('series'), action.series, state);
    }
    return state;
}