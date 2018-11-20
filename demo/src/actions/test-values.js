import { SET_VALUE } from './types';

export function setValueAction(value) {
  return {
    type: SET_VALUE,
    payload: value,
  };
}