import React from 'react'

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    }
    this.handleClick = this.handleClick.bind(this)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if (nextState.num % 5 === 0) {
      return true;
    }
    return false;
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    const num = this.state.num;
    return (
      <div>
        <p>{num}</p>
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}

export default Demo