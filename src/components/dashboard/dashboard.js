import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { getMsgList, recvMsg } from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import Msg from '../msg/msg';
import Me from '../me/me';
@connect(
  state => state,
  { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  render() {
    const pathname = this.props.location.pathname;
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'genius',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: Me
      }
    ];
    // 让动画生效，只渲染一个route，根据当前的path决定组件
    const page = navList.find(v => v.path == pathname);
    const navTitle = navList.find(v => v.path === pathname);
    if (page && navTitle) {
      return (
        <div>
          <NavBar className="fixed-header" mode="bard">
            {navTitle.title ? navTitle.title : null}
          </NavBar>
          <div style={{ marginTopp: 45 }}>
            <QueueAnim type="scale" duration={800}>
              {/* <Switch>
                  {navList.map(v => (
                    <Route key={v.path} path={v.path} component={v.component} />
                  ))}
                </Switch> */}
              <Route key={page.path} path={page.path} component={page.component} />
            </QueueAnim>
          </div>
          <NavLinkBar className="fixed-footer" data={navList} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DashBoard;
