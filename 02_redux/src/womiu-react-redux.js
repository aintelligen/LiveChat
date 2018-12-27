// react redux
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './woniu-redux'



// connect 链接组件，redux 的数据放到组件的属性里
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapperComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { store } = this.context;
      store.subscribe(() => this.update());
      this.update()
    }
    // 直接执行 addGun() 没有意义
    // 使用store.dispatch(addGun()) 才有一样
    // addGun = ()=>  store.dispatch(addGun()) 这样 用dispatch 包了一层 action

    // 获取mapStateToProps ， mapDispatchToProps 放入props
    update() {
      const { store } = this.context;
      const stateProps = mapStateToProps(store.getState());
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return <WrapperComponent {...this.state.props}></WrapperComponent>
    }
  }
}
// Provider 把store 放到context里，所有子元素就可以直接取到store
export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  getChildContext() {
    return { store: this.store }
  }
  render() {
    return this.props.children;
  }
}