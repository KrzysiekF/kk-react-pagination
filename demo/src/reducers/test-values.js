import { SET_VALUE } from '../actions/types';

export default function (state = { testValue: null }, action) {
  switch (action.type) {
    case SET_VALUE:
        return { ...state, testValue: action.payload };

    default:
      return state;
  }
}