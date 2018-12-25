import Axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST='MSG_LIST'
const MSG_READ='MSG_READ'
const MSG_RECV='MSG_RECV'

const initState = {
  chatmsg:[],
  unread:0,
  users:{}
}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return {...state, users:action.payload.users,chatmsg:action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read).length}
    case MSG_READ:
    case MSG_RECV:
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread: state.unread+1}
    default:
      return state;
  }
}

export function msgList(msgs,users){
  return {type: MSG_LIST,payload:{msgs,users}}
}
export function recvMsg(){
  return dispatch =>{
    socket.on('recvmsg',function(msgs){
      dispatch(msgRecv(msgs))
    })
  }  
}
export function sendMsg({from,to,msg}){
  return dispatch =>{
    socket.emit('sendmsg',{from,to,msg})
  }  
}

export function msgRecv(msgs){
  return {type:MSG_RECV, payload:msgs}
}



export function getMsgList(){
  return dispatch =>{
    Axios.get('/user/getmsglist').then((res)=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs,res.data.users));
      } else {
        
      }
    })
  }
}