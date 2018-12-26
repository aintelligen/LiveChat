import React from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button,Badge} from 'antd-mobile'
import {connect} from 'react-redux' 


@connect(
  state=>state
)
class Msg extends React.Component {
  componentDidMount() {
  }
  getLast(arr){
    return arr[arr.length-1]
  }
  render() {
    const Item=List.Item;
    const Brief=Item.Brief;
    const userid =this.props.user._id;
    const msgGroup = {}
    if(this.props.chat.chatmsg.length < 1){
      
    }
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chat_id] = msgGroup[v.chat_id] || [];
      msgGroup[v.chat_id].push(v);
    })
    const users = this.props.chat.users;
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const aLast = this.getLast(a);
      const bLast = this.getLast(b);
      return bLast.create_time - aLast.create_time
    })
    
    return (
      <div>
        <List>
          {
            chatList.map(v=>{
              const lastItem = this.getLast(v);
              const targetid = v[0].from === userid ? v[0].to : v[0].from;
              const unreadNum = v.filter(list=>
                !list.read && list.to === userid
              ).length;
              if(!users[targetid]){
                return null;
              }
              const name = users[targetid] ? users[targetid].name : '';
              const avatar = users[targetid] ? users[targetid].avatar : '';
              return (
              <List key={lastItem._id}>
                <Item                
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${avatar}.png`)}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetid}`)}
                >     
                  {lastItem.content}
                  <Brief>
                    {name}
                  </Brief>           
                </Item>
              </List>
              )
            })
          }
        </List>
      </div>
    )
  }
}

export default Msg