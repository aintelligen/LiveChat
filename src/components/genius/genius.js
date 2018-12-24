import React from 'react'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard'
import { getUserList } from '../../redux/chat.user.redux'

@connect(
  state => state.chatuser,
  {
    getUserList
  }
)
class Genius extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('boss');
  }
  render() {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Genius