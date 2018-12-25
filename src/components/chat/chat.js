import React from 'react'
import {List , InputItem,NavBar,Icon} from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList,sendMsg ,recvMsg} from '../../redux/chat.redux'

import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

@connect(
  state => state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      text:'',
      msg:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.back = this.back.bind(this)
  }
  componentDidMount() {
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList();
      this.props.recvMsg();
    }
    
  }
  handleSubmit(){
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from,to,msg});
    this.setState({
      text:''
    })
  }
  back(){

  }
  render() {
    console.log(this.props.chat.chatmsg);
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const Item = List.Item;
    return (

      <div id="chat-page">
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[userid] ? users[userid].name : ''}
        </NavBar>

        {
          this.props.chat.chatmsg.length > 0 ? this.props.chat.chatmsg.map(v=>{
            return v.from === userid ? (
              <List key={v._id}>
                <Item 
                >
                  对方发来的：{v.content}
                </Item>
              </List>
            ) : (
              <List key={v._id} className="chat-me">
                <Item
                >
                  我发的：{v.content}
                </Item>
              </List>
            )
            
          }) : null
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({
                  text:v
                })
              }}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat