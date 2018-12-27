const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}

const arrThunk = ({ dispatch, getState }) => next => action => {
  console.log(action)
  if (Array.isArray(action)) {
    return action.forEach(v => dispatch(v))
  }
  return next(action)
}

export {
  thunk,
  arrThunk
} 