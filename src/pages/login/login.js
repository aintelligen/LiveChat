import React from 'react'
import Logo from '../../components/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state=>state.user,
  {
    login
  }
)
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      pwd: '',
    }
    this.register = this.register.bind(this)
    this.loginAct = this.loginAct.bind(this)
  }
  register(){
    this.props.history.push('/register')
  }
  loginAct(){
    this.props.login(this.state);
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => { this.handleChange('user', v) }}>用户名</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={(v) => { this.handleChange('pwd', v) }}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.loginAct}>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button  type="primary" onClick={this.register}>注册</Button>          
        </WingBlank>
      </div>
    )

  }
}

export default Login