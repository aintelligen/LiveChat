import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
import { getChatId } from '../../utils'

import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fixCarsoul = this.fixCarsoul.bind(this)
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
    // const to = this.props.match.params.user;
    // this.props.readMsg(to)
  }
  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to)
  }
  fixCarsoul() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
  handleSubmit() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  render() {
    const emojin = '😡 ❤ 🎃 😸 🐭 🐮 🐯 🐼 🐻 🐺 🐹 🐸 🐷 🐶 🐵 🐴 🐲 🐱'.split(' ');
    const emojins = [...emojin, ...emojin, ...emojin, ...emojin].filter(v => v).map(v => (
      { text: v }
    ))
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const Item = List.Item;
    const chat_id = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chat_id === chat_id);
    return (

      <div id="chat-page">
        <div className="stick-header">
          <NavBar className="header-navbar" mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
          >
            {users[userid] ? users[userid].name : ''}
          </NavBar>
        </div>
        <QueueAnim type="left" delay={100}>
          {
            chatmsgs.length > 0 ? chatmsgs.map(v => {
              const avatar = require(`../img/${users[v.from].avatar}.png`)
              return v.from === userid ? (
                <List key={v._id}>
                  <Item
                    thumb={avatar}
                  >
                    {v.content}
                  </Item>
                </List>
              ) : (
                  <List key={v._id} className="chat-me">
                    <Item
                      extra={<img src={avatar} />}
                    >
                      {v.content}
                    </Item>
                  </List>
                )

            }) : null
          }
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <div>
                  <span style={{ marginRight: 15 }} onClick={
                    () => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarsoul()
                    }
                  }>😡</span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {
            this.state.showEmoji ? <Grid
              data={emojins}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            >
            </Grid> :
              null
          }
        </div>
      </div>
    )
  }
}

export default Chat