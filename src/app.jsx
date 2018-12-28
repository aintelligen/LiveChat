import React from 'react'
import AuthRoute from './components/authroute/authroute'
import { Route, Switch } from 'react-router-dom'
import Register from './pages/register/register';
import Login from './pages/login/login';
import BossInfo from './pages/bossinfo/bossinfo';
import GeniusInfo from './pages/geniusinfo/geniusinfo';
import DashBoard from './components/dashboard/dashboard';
import Chat from './components/chat/chat';

class App extends React.Component {
  render() {
    return (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/chat/:user" component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App