import React from 'react'
import Logo from '../../components/logo/logo.js'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { register }

)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatpwd: ''
    }
    this.registerSub = this.registerSub.bind(this)
    this.login = this.login.bind(this)
  }
  registerSub() {
    this.props.register(this.state);
  }
  login() {

    this.props.history.push('/login')
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  componentDidMount() {
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <p>{this.props.msg ? this.props.msg : ''}</p>
            <InputItem onChange={(v) => { this.handleChange('user', v) }}>用户名</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={(v) => { this.handleChange('pwd', v) }}>密码</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={(v) => { this.handleChange('repeatpwd', v) }}>确认密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            checked={this.state.type === 'genius'}
            onClick={() => { this.handleChange('type', 'genius') }}>
            牛人
          </RadioItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            checked={this.state.type === 'boss'}
            onClick={() => { this.handleChange('type', 'boss') }}>
            Boss
          </RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.registerSub}>注册</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.login}>登录页</Button>
        </WingBlank>

      </div>
    )

  }
}

export default Register