import { SET_PAGE, SET_PAGES_COUNT } from '../actions/types';
import _ from 'lodash';

export default function () {
    var _$merge, _$merge2;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case SET_PAGE:
            return _.merge({}, state, (_$merge = {}, _$merge[action.name] = action.payload, _$merge));
        case SET_PAGES_COUNT:
            return _.merge({}, state, (_$merge2 = {}, _$merge2[action.name] = action.payload, _$merge2));
        default:
            return state;
    }
}