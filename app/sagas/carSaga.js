import {put, fork, select, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import querystring from 'querystring';

export default function* (){
    // 拦截各种东西
    yield takeEvery('LOADDATA', function* (){
        // yield put({'type': 'CLEAR'});
        yield fork(fetchserver);
    });


    // 改变页码
    yield takeEvery('CHANGEPAGE', function* ({page}){
        yield put({'type': 'CHANGEPAGE_', page});
        yield fork(fetchserver);
    });

    // 改变页面尺寸
    yield takeEvery('CHANGEPAGESIZE', function* ({pagesize}){
        yield put({'type': 'CHANGEPAGE_', 'page': 1});
        yield put({'type': 'CHANGEPAGESIZE_', pagesize});
        yield fork(fetchserver);
    });


    // 这个是神迹，封装了一个改变过滤器的saga
    yield takeEvery('CHANGEFILTER', function* ({k, v}){
        yield put({'type': 'CHANGEPAGE_', 'page': 1});
        yield put({'type': 'CHANGEFILTER_', k, v});
        yield fork(fetchserver);
    });


    // 拦截改变排序
    yield takeEvery('CHANGESORTBY', function* ({sortby}){
        yield put({'type': 'CHANGEPAGE_', 'page': 1});
        yield put({'type': 'CHANGESORTBY_', sortby});
        yield fork(fetchserver);
    });

    // 拦截改变排序
    yield takeEvery('CHANGESORTDIRECTION', function* ({sortdirection}){
        yield put({'type': 'CHANGEPAGE_', 'page': 1});
        yield put({'type': 'CHANGESORTDIRECTION_', sortdirection});
        yield fork(fetchserver);
    });
}


// 公用函数
export const fetchserver = function* fetchserver(){
    const carReducer = yield select(({carReducer}) => carReducer);
    const bsReducer = yield select(({bsReducer}) => bsReducer);

    const {results, total} = yield axios.get(
        '/api/car?' + querystring.stringify({
            'page': carReducer.page,
            'pagesize': carReducer.pagesize,
            'color': carReducer.color.join('v'),
            'exhaust': carReducer.exhaust.join('v'),
            'engine': carReducer.engine.join('v'),
            'gearbox': carReducer.gearbox.join('v'),
            'fuel': carReducer.fuel.join('v'),
            'price': carReducer.price.join('to'),
            'km': carReducer.km.join('to'),
            'buydate': carReducer.buydate.join('to'),
            'sortby': carReducer.sortby,
            'sortdirection': carReducer.sortdirection,
            'brand': bsReducer.brand,
            'series': bsReducer.series
        })
    ).then(data => data.data);
    yield put({'type': 'LOADDATA_', results, total});
}

 