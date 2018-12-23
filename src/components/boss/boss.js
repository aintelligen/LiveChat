import React from 'react'
import {Card, WingBlank, WhiteSpace,} from 'antd-mobile'
import Axios from 'axios'
import {userList} from '../../api/apiList'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chat.user.redux'

@connect(
  state=>state.chatuser,
  {
    getUserList
  }
)
class Boss extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    /* Axios.get('/user/list?type=genius').then((res)=>{
      if(res.data.code == 0){
        this.setState({
          data:res.data.data
        })
      }
    }); */
    this.props.getUserList('genius');
  }
  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        {this.props.userList.map(v=>(
         <Card key={v._id}>
            <WhiteSpace></WhiteSpace>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}></Header>
            <Body>
              {
                v.desc
              }
            </Body>
          </Card>
        ))}
      </WingBlank>
    )
  }
}

export default Boss