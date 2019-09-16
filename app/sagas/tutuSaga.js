import {put, fork, select, takeEvery, delay} from 'redux-saga/effects';
var R = require('ramda');

export default function*(){
    yield takeEvery('LOADTUTU1', function*(){
        yield delay(2000);
        yield put({'type': 'LOADTUTU1_', 'sj': [30, 21, 22, 89, 43, 21]});
      
    });
}