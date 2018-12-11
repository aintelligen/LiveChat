const ADD = 'ADD'
const REMOVE = 'REMOVE'

const LOGIN = "LOGIN";
const LOGOUT = 'LOGOUT'


// reducer
export function counter(state = 0, action) {
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
  return dispatch => {
    setTimeout(() => {
      dispatch(addGUN())
    }, 2000)
  }
}

// login
export function auth(state = { isAuth: false, user: 'liyunlong' }, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: true }
    case LOGOUT:
      return { ...state, isAuth: false }
    default:
      return state
  }
}

// action
export function login() {
  return { type: LOGIN }
}
export function logout() {
  return { type: LOGOUT }
}