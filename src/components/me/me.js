import React from 'react'
import { Result, List, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
  state => state.user
)

class Me extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const props = this.props;
    return (
      <div>
        <Result
          img={props.avatar ? <img src={require(`../img/${props.avatar}.png`)}></img> : null}
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
        <List><Item>退出登录</Item></List>
      </div>
    )
  }
}

export default Me