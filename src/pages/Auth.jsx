import React from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/index'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

@connect(
  state => state.auth,
  { login }
)
class Auth extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.isAuth ? <Redirect to="/dashbaord"></Redirect> : null}
        <button onClick={this.props.login}>登录</button>
      </div>
    )

  }
}

export default Auth