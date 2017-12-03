import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Authorization from 'utils/auth'
import TransitionedPage from 'utils/transition'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import NotFound from 'containers/error/notFound'

const Manager = Authorization(['manager', 'staff'])
const Admin = Authorization()

/* eslint-disable react/prop-types */
const Routes = () => (
  <Switch>
    <Route path='/' exact component={TransitionedPage(Manager(Task))} />
    <Route path='/task' exact component={TransitionedPage(Admin(Task))} />
    <Route path='/login' exact component={TransitionedPage(Login)} />
    <Route path='/register' exact component={TransitionedPage(Register)} />
    <Route component={TransitionedPage(NotFound)} />
  </Switch>
)
/* eslint-enable react/prop-types */

export default Routes
