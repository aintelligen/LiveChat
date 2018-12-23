import React from 'react'
import { NavBar, InputItem, TextareaItem , Button,WingBlank,WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


@connect(
  state=>state.user,
  {
    update
  }
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar:''
    }
  }
  componentDidMount() {
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname;
    const redirectTo =this.props.redirectTo;
    return (
      <div>
         { redirectTo && redirectTo!==path ? <Redirect to={redirectTo}/> : null}
        <NavBar
          mode="dark"
        >BOSS完善信息页面</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}
        >
        </AvatarSelector>
        <InputItem
          onChange={v => this.onChange('title', v)}
        >招聘职位</InputItem>
        <InputItem
          onChange={v => this.onChange('company', v)}
        >招聘公司</InputItem>
        <InputItem
          onChange={v => this.onChange('money', v)}
        >职位薪资</InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
        ></TextareaItem>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button
            onClick={()=>{
              this.props.update(this.state)
            }}
          type="primary">保存</Button>
        </WingBlank>
      </div>
    )

  }
}

export default BossInfo