import React from 'react'

import { Map, is } from 'immutable'

// bind click  在构造函数绑定this
// 参数尽量少传递，
// immutable
/* 优点：减少内存，降低项目复杂度，便于比较数据，时间旅行功能方便，函数式编程，
缺点：库的大小 （seamless-immutable） */
//  key 必须唯一，不用 index,  便于优化，操作虚拟dom diff
let obj = Map({
  name: 'imooc',
  title: 'web',
  course: Map({
    name: 'react_redux'
  })
})
let objc = Map({
  name: 'imooc',
  title: 'web',
  course: Map({
    name: 'react_redux'
  })
})

let obj1 = obj.set('name', 'woniu')

console.log(is(obj.objc));

console.log(obj.get('course') === obj1.get('course'));

console.log(obj == obj1)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1,
      name: '',
      title: 'title'
    }
    console.log('构造函数执行')
    // 优化bind click
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log('xx')
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    // bind 多次 click 
    // 使用 const 在这里， 尽可能减少参数传递的数量
    return (
      <div>
        <h2>App：{this.state.num}</h2>
        <button onClick={this.handleClick}>add</button>
        <button onClick={this.handleClick.bind(this)}>add</button>
        <Demo title={this.state.title}></Demo>
      </div>
    )
  }
}
class Demo extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.title === this.props.title) {
      return false;
    }
    return true;
  }
  render() {
    console.log('demo render')
    return (
      <h3>{this.props.title}</h3>
    )
  }
}
export default App;
