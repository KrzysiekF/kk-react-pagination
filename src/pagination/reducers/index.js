import _ from 'lodash';
import update from 'immutability-helper';
import { SET_PAGE, SET_PAGES_COUNT, SET_DATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_PAGE:
      return _.merge({}, state, { [action.name]: action.payload });
    case SET_PAGES_COUNT:
      return _.merge({}, state, { [action.name]: action.payload });
    case SET_DATA:
      return update(state, {
        [action.name]: {
          data: {
            $set: action.payload,
          },
        },
      });
      // return _.merge({}, state, { [action.name]: action.payload });
    default:
      return state;
  }
}
