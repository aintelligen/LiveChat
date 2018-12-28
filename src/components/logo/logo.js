import React from 'react'
class Logo extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="login-container" style={require('./style.css')}>
        <img src={require('./job.png')} alt="" />
      </div>
    )

  }
}

export default Logo