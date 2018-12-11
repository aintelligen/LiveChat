import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'
import App from './App'


import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import Auth from './pages/Auth'
import Dashboard from './Dashboard'


const store = createStore(
  Reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
  )
)

console.log(store.getState())

ReactDom.render(
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" exact component={Auth}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Redirect to="/dashboard"></Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"))
