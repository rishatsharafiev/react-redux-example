import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Authorization from 'utils/auth/authorization'
import Task from 'containers/task/task'
import Login from 'containers/auth/login'
import Register from 'containers/auth/register'
import NotFound from 'containers/error/notFound'

const transitionOptions = {
  transitionName: 'fade',
  transitionEnterTimeout: 1500,
  transitionLeaveTimeout: 1500,
}

const Manager = Authorization(['manager', 'staff'])
const Admin = Authorization()

/* eslint-disable react/prop-types */
const Routes = props => (
  <ReactCSSTransitionGroup {...transitionOptions}>
    <Switch key={props.location.pathname} location={props.location}>
      <Route path='/' exact component={Manager(Task)} />
      <Route path='/task' exact component={Admin(Task)} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route component={NotFound} />
    </Switch>
  </ReactCSSTransitionGroup>
)
/* eslint-enable react/prop-types */

export default Routes
