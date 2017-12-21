import React from 'react'
import { Switch, Route } from 'react-router'
import Authorization from 'utils/auth/authorization'
import Home from 'containers/home/home'
import TaskList from 'containers/task/list'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import Logout from 'containers/auth/logout'
import NotFound from 'containers/error/notFound'

const Anonymous = Authorization(['guest'], false)
const Auth = Authorization(['admin', 'moderator', 'manager', 'user'])

const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/tasks' exact component={Auth(TaskList)} />
    <Route path='/login' exact component={Anonymous(Login)} />
    <Route path='/register' exact component={Anonymous(Register)} />
    <Route path='/logout' exact component={Auth(Logout)} />
    <Route component={NotFound} />
  </Switch>
)

export default routes
