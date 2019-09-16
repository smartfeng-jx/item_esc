const initState = {
    result: {},
    id: 0
};

var R = require('ramda');

export default (state = initState, action) => {
    if(action.type === 'LOADCARINFO_'){
        return {
            ...state,
            'result': action.result,
            'id': action.id
        }
    }
    return state;
}