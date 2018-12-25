import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { logoutSubmit,resetState } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  {
    logoutSubmit,
    resetState
  }
)

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          browserCookie.erase('')
          this.props.logoutSubmit()          
          
        }
      },
    ]);

  }
  componentDidMount() {

  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const props = this.props;
    return (
      <div>
        {this.props.redirectTo === '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Result
          img={props.avatar ? <img src={require(`../img/${props.avatar}.png`)} alt={props.avatar}></img> : null}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        >
        </Result>
        <List renderHeader='简介'>
          <Item multipleLine>
            <Brief>{props.title}</Brief>
            <Brief>{props.desc}</Brief>
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List><Item onClick={this.logout}>退出登录</Item></List>
      </div>
    )
  }
}

export default Me