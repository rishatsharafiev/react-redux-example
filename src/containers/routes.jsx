import React from 'react'
import { Switch, Route } from 'react-router'
import Authorization from 'utils/auth/authorization'
import Home from 'containers/home/home'
import TaskBrowse from 'containers/task/browse'
// import TaskAdd from 'containers/task/add'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import Logout from 'containers/auth/logout'
import NotFound from 'containers/error/notFound'

const Anonymous = Authorization(['000'], false)
const Auth = Authorization(['100'])

const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/tasks' exact component={Auth(TaskBrowse)} />
    {/*
    <Route path='/tasks/add' exact component={Auth(TaskAdd)} />
    <Route path='/tasks/:id' exact component={Auth(TaskRead)} />
    */}
    <Route path='/login' exact component={Anonymous(Login)} />
    <Route path='/register' exact component={Anonymous(Register)} />
    <Route path='/logout' exact component={Auth(Logout)} />
    <Route component={NotFound} />
  </Switch>
)

export default routes
