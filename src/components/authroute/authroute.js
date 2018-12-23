import React from 'react'
import Axios from 'axios';
import { userInfo } from '../../api/apiList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {loadData} from '../../redux/user.redux'

@connect(
  null,
  {
    loadData
  }
)
@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    Axios.get(userInfo).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        this.props.loadData(res.data.data)
      } else {
        this.props.history.push('/login')
      }
    })
    // 获取用户信息
    // 用户信息
    // 用户身份
    // 获取用户信息
  }
  render() {
    return ''

  }

}

export default AuthRoute