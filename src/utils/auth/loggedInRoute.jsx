import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, Redirect } from 'react-router'
import actions from 'actions/auth'

const LoggedInRouteContainer = ({
  component: Component,
  actions: {
    isLoggedIn,
  },
  ...rest
}) => (
  /* eslint-disable react/prop-types */
  <Route
    {...rest}
    render={props => (
      isLoggedIn().loggedIn ?
        <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }
  />
  /* eslint-enable react/prop-types */
)

LoggedInRouteContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(LoggedInRouteContainer)
