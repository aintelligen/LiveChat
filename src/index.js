import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Reducer from './reducer'
import './index.css'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import App from './app'
import './config'




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
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"))
