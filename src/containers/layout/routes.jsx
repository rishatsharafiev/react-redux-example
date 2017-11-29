import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import NotFound from 'containers/error/notFound'

const Routes = (
  <Switch>
    <Route path='/' exact component={Task} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
