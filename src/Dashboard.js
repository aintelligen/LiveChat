import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './redux/index'

function One() {
  return <h2>one</h2>
}
function Two() {
  return <h2>two</h2>
}
function Three() {
  return <h2>three</h2>
}

@connect(
  state => state.auth,
  { logout }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    console.log(this.props)
    const app = (
      <div>
        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          <li><Link to="/dashboard/">one</Link></li>
          <li><Link to="/dashboard/two">two</Link></li>
          <li><Link to="/dashboard/three">three</Link></li>
        </ul>
        <Route path="/dashboard/" exact component={One}></Route>
        <Route path="/dashboard/two" component={Two}></Route>
        <Route path="/dashboard/three" component={Three}></Route>

      </div>
    );
    const loginApp = <Redirect to="/login"></Redirect>
    return this.props.isAuth ? app : loginApp
  }
}

export default Dashboard

