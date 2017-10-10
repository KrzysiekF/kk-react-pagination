import { combineReducers } from 'redux';

import Pagination from '../../../src/pagination/reducers';

const rootReducer = combineReducers({
  paginations: Pagination,
});

export default rootReducer;
