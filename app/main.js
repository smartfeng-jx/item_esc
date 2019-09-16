import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import reduxSaga from 'redux-saga';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import reducer from './reducers/index.js';
import carSaga from './sagas/carSaga.js';
import bsSaga from './sagas/bsSaga.js';
import carinfoSaga from './sagas/carinfoSaga.js';
import tutuSaga from './sagas/tutuSaga.js';
import router from './router.js';

import './css/css.css';

// saga中间件
const sagaMiddleware = reduxSaga();
// 路由中间件
const routerMW = routerMiddleware(hashHistory);
// 创建redux的store
const store = createStore(reducer, applyMiddleware(sagaMiddleware, routerMW));
// 运行saga
sagaMiddleware.run(carSaga);
sagaMiddleware.run(bsSaga);
sagaMiddleware.run(carinfoSaga);
sagaMiddleware.run(tutuSaga);

// 创建历史
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        {router(history)}
    </Provider>
    ,
    document.getElementById('app')
);