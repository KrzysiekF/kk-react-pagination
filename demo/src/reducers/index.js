import { combineReducers } from 'redux';

import Pagination from '../../../src/pagination/reducers';
import TestValues from './test-values';

const rootReducer = combineReducers({
  paginations: Pagination,
  testValues: TestValues,
});

export default rootReducer;
