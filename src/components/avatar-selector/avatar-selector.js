import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon , Grid, List} from 'antd-mobile'


class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      icon:''
    }
  }
  componentDidMount() {
  }
  render() {
    const avatarList = "ball,boss,boy,default,genius,girl,msg,user".split(",").map(v=>({
      icon:require(`../img/${v}.png`),
      text:v
    }))
    const gridHeader = this.state.icon ? 
      (<div><span>已选择头像</span><img src={this.state.icon}/></div>) :
      (<div>请选择头像</div>)
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
            data={avatarList}
            onClick={elm=>{
              this.setState({
                icon: elm.icon
              })
              this.props.selectAvatar(elm.text)
            }}
          ></Grid>
        </List>
      </div>
    )

  }
}

export default AvatarSelector