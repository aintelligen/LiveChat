import React from 'react'
import Logo from '../../components/logo/logo.js'
import ImoocForm from '../../components/imooc-form/imooc-form'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


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
  state=>state.user,
  {
    login
  }
)
@ImoocForm
class Login extends React.Component {
  constructor(props){
    super(props);
    this.register = this.register.bind(this)
    this.loginAct = this.loginAct.bind(this)
  }
  register(){
    this.props.history.push('/register')
  }
  loginAct(){
    this.props.login(this.props.state);
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
            <InputItem onChange={(v) => { this.props.handleChange('user', v) }}>用户名</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={(v) => { this.props.handleChange('pwd', v) }}>密码</InputItem>
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