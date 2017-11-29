import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  auth: {
    isAuthenticated,
  },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      )}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  rest: PropTypes.object,
  location: PropTypes.object,
}

PrivateRoute.defaultProps = {
  rest: {},
  location: {},
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
