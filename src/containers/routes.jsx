import React from 'react'
import { Switch, Route } from 'react-router'
import Authorization from 'utils/auth/authorization'
import Home from 'containers/home/home'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import Logout from 'containers/auth/logout'
import NotFound from 'containers/error/notFound'

const Anonymous = Authorization(['anonymous'])
const Auth = Authorization(['100', '200', '300', '400', '500'])

const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/tasks' exact component={Auth(Task)} />
    <Route path='/login' exact component={Anonymous(Login)} />
    <Route path='/register' exact component={Anonymous(Register)} />
    <Route path='/logout' exact component={Logout} />
    <Route component={NotFound} />
  </Switch>
)

export default routes
