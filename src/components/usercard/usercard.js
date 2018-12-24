import React from 'react'
import { Card, WingBlank, WhiteSpace, } from 'antd-mobile'
import PropTypes from 'prop-types'


class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        {this.props.userList.map(v => (
          <Card key={v._id}>
            <WhiteSpace></WhiteSpace>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}></Header>
            <Body>
              {
                v.type === 'boss' ? <div>公司名称：{v.company}</div> : null
              }
              {
                v.desc
              }
              {
                v.type === 'boss' ? <div>薪资：{v.money}</div> : null
              }
            </Body>
          </Card>
        ))}
      </WingBlank>
    )
  }
}

export default UserCard