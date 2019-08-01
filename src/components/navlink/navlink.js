import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(state => state.chat)
class NavLinkBar extends React.Component {
  // #108EE9
  // #888888
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path === '/msg' ? this.props.unread : ''}
            title={v.text}
            key={v.path}
            icon={{ uri: require(`../img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`../img/${v.icon}-ac.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}

export default NavLinkBar;
