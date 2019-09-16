import carReducer from './carReducer.js';
import bsReducer from './bsReducer.js';
import carinfoReducer from './carinfoReducer.js';
import tutuReducer from './tutuReducer.js';
import {combineReducers} from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

export default combineReducers({
    carReducer,
    bsReducer,
    carinfoReducer,
    tutuReducer,
    routing: routerReducer
});