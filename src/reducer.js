// 合并reducer
import { combineReducers } from 'redux'
import { counter, auth } from './redux/index'

export default combineReducers({ counter, auth })