import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoggedInRoute from 'utils/auth/loggedInRoute'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import NotFound from 'containers/error/notFound'

const Routes = (
  <Switch>
    <Route path='/' exact component={Task} />
    <Route path='/login' exact component={Login} />
    <Route path='/register' exact component={Register} />
    <LoggedInRoute path='/task' exact component={Task} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
