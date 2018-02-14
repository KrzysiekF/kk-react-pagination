import { combineReducers } from 'redux';
import Pagination from '../pagination/reducers';

var rootReducer = combineReducers({
  paginations: Pagination
});

export default rootReducer;