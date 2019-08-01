import React from 'react';
import Logo from '../../components/logo/logo.js';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import ImoocForm from '../../components/imooc-form/imooc-form';

@connect(
  state => state.user,
  { register }
)
@ImoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerSub = this.registerSub.bind(this);
    this.login = this.login.bind(this);
    this.registerSubClick.intcreament = false;
  }
  registerSub() {
    this.registerSubClick.intcreament = true;
    this.props.register(this.props.state);
    if (this.props.msg) {
      Toast.show(this.props.msg, 2.0);
    }
  }
  registerSubClick() {}
  login() {
    this.props.history.push('/login');
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }
  componentWillReceiveProps(props) {
    if (this.registerSubClick.intcreament) {
      console.log(props);
      if (props.msg) {
        Toast.show(props.msg, 2.0);
        this.registerSubClick.intcreament = false;
      }
    }
  }
  render() {
    const RadioItem = Radio.RadioItem;

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              onChange={v => {
                this.props.handleChange('user', v);
              }}
            >
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => {
                this.props.handleChange('pwd', v);
              }}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => {
                this.props.handleChange('repeatpwd', v);
              }}
            >
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onClick={() => {
              this.props.handleChange('type', 'genius');
            }}
          >
            牛人
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onClick={() => {
              this.props.handleChange('type', 'boss');
            }}
          >
            Boss
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.registerSub}>
            注册
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.login}>
            登录页
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
