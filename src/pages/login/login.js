import React from 'react';
import Logo from '../../components/logo/logo.js';
import ImoocForm from '../../components/imooc-form/imooc-form';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { login, resetState } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

// 属性代理
/* function wrapperHello(Component){
  class Wrapper extends Component{
    componentDidMount(){
      console.log('高阶组件新增的生命周期，加载完成')
    }
    render(){
      return(
        <div>
          <p>这个高阶组件</p>
          <Component {...this.props}></Component>
        </div>
      )
    }
  }
  class Wrapper extends React.Component{
    render(){
      return(
        <div>
          <p>这个高阶组件</p>
          <Component {...this.props}></Component>
        </div>
      )
    }
  }
  return Wrapper;
}
@wrapperHello
class Hello extends React.Component{
  render(){
    return(
      <h2>hello</h2>
    )
  }
} */

@connect(
  state => state.user,
  {
    login,
    resetState
  }
)
@ImoocForm
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.loginAct = this.loginAct.bind(this);
    this.registerSubClick.intcreament = false;
  }
  register() {
    this.props.resetState();
    this.props.history.push('/register');
  }
  loginAct() {
    this.registerSubClick.intcreament = true;
    this.props.login(this.props.state);

    if (this.props.msg) {
      Toast.show(this.props.msg, 2.0);
    }
  }
  registerSubClick() {}
  componentWillReceiveProps(props) {
    if (this.registerSubClick.intcreament) {
      if (props.msg) {
        Toast.show(props.msg, 2.0);
        this.registerSubClick.intcreament = false;
      }
    }
  }
  componentDidMount() {}
  render() {
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
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.loginAct}>
            登录
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
