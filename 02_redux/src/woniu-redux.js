// redux 
export function createStore(reducer, enhance) {
  if (enhance) {
    return enhance(createStore)(reducer)
  }
  let currentState = {};
  let currentListerners = []

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentListerners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListerners.forEach(element => {
      element();
    });
    return currentState;
  }
  dispatch({ type: '@imooc/Worniu-redux' })

  return { getState, subscribe, dispatch }

}
export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)

    }
    let middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    // dispatch = middleware(midApi)(store.dispatch)

    return {
      ...store,
      dispatch
    }

  }
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
// addGun(args)
// reutrn  dispatch(addGun(args))
export function bindActionCreators(creators, dispatch) {
  let bound = {}
  Object.keys(creators).forEach(v => {
    let creator = creators[v]
    bound[v] = bindActionCreator(creator, dispatch)
  })
  return bound;
}