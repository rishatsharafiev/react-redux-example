import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Task from 'containers/task/task'
import LoginPage from 'containers/auth/loginPage'
import NotFound from 'containers/error/notFound'

const Routes = (
  <Switch>
    <Route path='/' exact component={Task} />
    <Route path='/login' exact component={LoginPage} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
