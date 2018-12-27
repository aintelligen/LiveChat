import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from './woniu-redux'
import { thunk, arrThunk } from './woniu-redux-thunk'
import { counter } from './index.redux'
import { Provider } from './womiu-react-redux'
import App from './App'
import Page from './context.demo'
import Demo from './demo'
import './01.learn.redux'


// ReactDOM.render(<Page />, document.getElementById('root'));


const store = createStore(counter, applyMiddleware(thunk, arrThunk)/* compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
) */)
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'))


