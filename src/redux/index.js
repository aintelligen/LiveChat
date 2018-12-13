import axios from 'axios'
// import {user} from '../api/apiList'

const ADD = 'ADD'
const REMOVE = 'REMOVE'

const LOGIN = "LOGIN";
const LOGOUT = 'LOGOUT'
const USERDATA = 'USERDATA'

const initState = {
  isAuth: false,
  user: '李云龙',
  age: 20
}

// reducer
export function counter(state = 20, action) {
  switch (action.type) {
    case ADD:
      return state + 1
    case REMOVE:
      return state - 1
    default:
      return 10
  }
}

export function addGUN() {
  return { type: ADD }
}
export function removeGUN() {
  return { type: REMOVE }
}

export function addGunAsync() {
  // console.log(dispatch);
  /* return dispatch => {
    setTimeout(() => {
      dispatch(addGUN())
    }, 2000)
  } */
}

// login
export function auth(state = initState, action) {
  console.log(state, action)
  switch (action.type) {
    case USERDATA:
      return { ...state, ...action.payload}
    case LOGIN:
      return { ...state, isAuth: true }
    case LOGOUT:
      return { ...state, isAuth: false }
    default:
      return state
  }
}

// action
export function getUserData() {
  return dispatch=>{
    axios.get('http://localhost:9093/user').then(
      res=>{
        if(res.status === 200){
          dispatch(userData(res.data[0]))
        }
      }
    )
  }
}
export function userData(data) {
  return { type: USERDATA, payload: data }
}
export function login() {
  return { type: LOGIN }
}
export function logout() {
  return { type: LOGOUT }
}