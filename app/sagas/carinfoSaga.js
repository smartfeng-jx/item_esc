import {put, fork, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import querystring from 'querystring';

export default function* (){
    yield takeEvery('LOADCARINFO', function*({id}){
        // 发出Ajax
        const {result} = yield axios.get('/api/car/' + id).then(data => data.data);
        yield put({'type': 'LOADCARINFO_', result, id});
    });
}