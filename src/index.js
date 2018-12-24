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
import GeniusInfo from './pages/geniusinfo/geniusinfo';
import DashBoard from './components/dashboard/dashboard';


const store = createStore(
  Reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
  )
)



ReactDom.render(
  <Provider store={store} >
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"))
