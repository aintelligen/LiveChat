import React from 'react'
import PropTypes from 'prop-types'


class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    )
  }
}

class Navbar extends React.Component {
  static contextTypes = {
    user: PropTypes.string
  }
  render() {
    console.log(this.context);
    return (
      <div>
        {this.context.user}
      </div>
    )
  }
}

class Page extends React.Component {
  static childContextTypes = {
    user: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
      user: '蜗牛'
    }
  }
  getChildContext() {
    return this.state;
  }
  render() {
    return (
      <div>
        <Sidebar user={this.state.user}></Sidebar>
      </div>
    )
  }
}
export default Page;
