var R = require('ramda');

export default (state = {'sj': [20,30,40]}, action) => {
    if(action.type === 'LOADTUTU1_'){
        return R.set(R.lensProp('sj'), action.sj, state);
    }
    return state;
}