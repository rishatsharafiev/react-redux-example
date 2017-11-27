import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Task from 'components/task/task'
import NotFound from 'components/error/notFound'

const Routes = (
  <Switch>
    <Route path='/' exact component={Task} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
