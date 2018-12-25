import Axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_READ = 'MSG_READ'
const MSG_RECV = 'MSG_RECV'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}

export function chat(state = initState, action) {
  console.log(action);
  switch (action.type) {
    case MSG_LIST:
      return { ...state, 
        users: action.payload.users, 
        chatmsg: action.payload.msgs, 
        unread: action.payload.msgs.filter(v => !v.read && v.to===action.payload.userid).length }
    case MSG_READ:
    case MSG_RECV:
        const n = action.payload.msgs.to === action.payload.userid ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload.msgs], unread: state.unread + n }
    default:
      return { ...state };
  }
}

export function msgList(msgs, users,userid) {
  return { type: MSG_LIST, payload: { msgs, users,userid} }
}
export function recvMsg() {
  return (dispatch,getState) => {
    socket.on('recvmsg', function (msgs) {
      const userid = getState().user._id
      dispatch(msgRecv(msgs,userid))
    })
  }
}
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function msgRecv(msgs,userid) {
  return { type: MSG_RECV, payload: {msgs,userid} }
}



export function getMsgList() {
  return (dispatch,getState) => {
    Axios.get('/user/getmsglist').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users,userid));
      } else {

      }
    })
  }
}