import Axios from "axios";
import { userRegister, userLogin, userInfo } from '../api/apiList'
import { getRedirectPath } from '../utils'

const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCESS = 'AUTH_SUCESS'
const UPDATE = 'UPDATE'
const LOGOUT = 'LOGOUT'
const RESET_STATE = 'RESET_STATE'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: '',
  pwd: ''
}



export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload, pwd: '' }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    case LOGOUT:
      return {...initState, redirectTo:'/login'};
    case RESET_STATE:
      return {...initState,redirectTo:''};
    default:
      return state;

  }

}


function authSucess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCESS, payload: data }
}
function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    Axios.post(userRegister, { user, pwd, repeatpwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess({ user, pwd, repeatpwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }

}

export function logoutSubmit() {
  return {type: LOGOUT}
}
export function resetState() {
  return {type: RESET_STATE}
}
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    Axios.post(userLogin, { user, pwd }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}
export function update(data) {
  return dispatch => {
    Axios.post('/user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSucess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    })
  }
}
