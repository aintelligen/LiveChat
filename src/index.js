import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css'
import AuthRoute from './components/authroute/authroute'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import './config'

import Register from './pages/register/register';
import Login from './pages/login/login';
import BossInfo from './pages/bossinfo/bossinfo';
import Boss from './pages/boss/boss';
import Genius from './pages/genius/genius';
import GeniusInfo from './pages/geniusinfo/geniusinfo';


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
        <AuthRoute></AuthRoute>
        <Route path="/" exact component={Login}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/bossinfo" component={BossInfo}></Route>         
        <Route path="/boss" component={Boss}></Route>         
        <Route path="/geniusinfo" component={GeniusInfo}></Route>         
        <Route path="/genius" component={Genius}></Route>         
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"))
