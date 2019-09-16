import {put, fork, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import querystring from 'querystring';
import {fetchserver} from './carSaga.js';

export default function* (){
    yield takeEvery('LOADALLBS', function*(){
        const allbs = yield axios.get('/api/allbs').then(data => data.data);
        yield put({'type': 'LOADALLBS_', allbs});
    });

    yield takeEvery('CHANGEBRAND', function*({brand}){
        yield put({'type': 'CHANGEBRAND_', brand});
        yield put({'type': 'CHANGESERIES_', 'series': ''});
        yield fork(fetchserver);
    });

    yield takeEvery('CHANGESERIES', function*({series}){
        yield put({'type': 'CHANGESERIES_', series});
        yield fork(fetchserver);
    });
}