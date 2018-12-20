import React from 'react'
import Logo from '../../components/logo/logo.js'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'genuis'
    }
    this.register = this.regitser.bind(this)
    this.login = this.login.bind(this)
  }
  regitser(){

  }
  login(){
    console.log(this.props.history)
    this.props.history.push('/login')
  }

  componentDidMount() {
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem>密码</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem>确认密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type == 'genuis'}>
            牛人
          </RadioItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type == 'boss'}>
            Boss
          </RadioItem>          
          <WhiteSpace></WhiteSpace>
          <Button  type="primary" onClick={this.register}>注册</Button>      
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.login}>登录</Button>    
        </WingBlank>
        
      </div>
    )

  }
}

export default Register