// 合并reducer
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chat.user.redux'

export default combineReducers({ user,chatuser })