import React from 'react';
import { Route , Switch} from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import Users from './user/Users';
import PrivateRoute from './auth/PrivateRoute';


const MainRouter = () => (
  <div>

    <Menu />
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/Signup" component={Signup}/>
      <Route exact path="/Signin" component={Signin}/>
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
      <PrivateRoute exact path="/user/:userId" component={Profile}/>
    </Switch>
  </div>
)


export default MainRouter;