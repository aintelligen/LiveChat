import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addGUN, removeGUN, addGunAsync } from './redux/index'
import Reducer from './reducer'
import './config.js'
import 'antd-mobile/dist/antd-mobile.css'

@connect(
  state => ({ num: state.counter }),
  { addGUN, removeGUN, addGunAsync }
)
class App extends Component {
  render() {
    const num = this.props.num;
    const addGUN = this.props.addGUN;
    const removeGUN = this.props.removeGUN;
    const addGunAsync = this.props.addGunAsync;
    return (
      <div className="App">
        现在有机枪{num}
        <div>
          <button onClick={addGUN}>+武器</button>
          <div><button onClick={removeGUN}>-武器</button></div>
          <div><button onClick={addGunAsync}>异步+武器</button></div>
        </div>
      </div>
    );
  }
}

export default App;
