import React from 'react'
import { connect } from 'react-redux'
import { login, getUserData } from '../redux/index'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.auth,
  { login, getUserData }
)
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    this.props.getUserData();
  }
  render() {
    return (
      <div>
        <h1>我的名字是{this.props.user}，年龄{this.props.age}</h1>
        {this.props.isAuth ? <Redirect to="/dashbaord"></Redirect> : null}
        <button onClick={this.props.login}>登录</button>
      </div>
    )

  }
}

export default Auth