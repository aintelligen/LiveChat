import React from 'react'
import UserCard from '../usercard/usercard'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.user.redux'

@connect(
  state => state.chatuser,
  {
    getUserList
  }
)
class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('genius');
  }
  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Boss