import React from 'react'
import Logo from '../../components/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Login extends React.Component {
  constructor(props){
    super(props)
    this.register = this.regitser.bind(this)
  }
  regitser(){
    console.log(this.props.history)
    this.props.history.push('/register')
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary">登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button  type="primary" onClick={this.register}>注册</Button>          
        </WingBlank>
      </div>
    )

  }
}

export default Login