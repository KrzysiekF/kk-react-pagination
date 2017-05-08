import { combineReducers } from 'redux'
import Pagination from '../pagination/reducers'

const rootReducer = combineReducers({
    paginations: Pagination
})

export default rootReducer
