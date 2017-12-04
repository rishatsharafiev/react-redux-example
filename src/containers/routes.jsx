import React from 'react'
import { Switch, Route } from 'react-router'
import Authorization from 'utils/auth'
import Home from 'containers/home/home'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import NotFound from 'containers/error/notFound'

// const Manager = Authorization(['manager', 'staff'])
const Admin = Authorization(['admin'])

const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/task' exact component={Admin(Task)} />
    <Route path='/login' exact component={Login} />
    <Route path='/register' exact component={Register} />
    <Route component={NotFound} />
  </Switch>
)

export default routes
