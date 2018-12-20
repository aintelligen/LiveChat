import React from 'react'
import LogoImg from './logo.svg'
import './style.css'
class Logo extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="login-container">
        <img src={LogoImg} alt="" />
      </div>
    )

  }
}

export default Logo