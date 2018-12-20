import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'

import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'


import Register from './pages/register/register';
import Login from './pages/login/login';


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
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"))
