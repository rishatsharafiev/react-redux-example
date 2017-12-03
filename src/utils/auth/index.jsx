import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const Authorization = (allowedRoles = null, Component = null) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const RedirectComponent = Component ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    const isTokenProvided = Boolean(props.token)
    return (isTokenProvided && !allowedRoles) ||
      (isTokenProvided && allowedRoles && allowedRoles.includes(props.role)) ?
        <WrappedComponent {...props} /> :
      RedirectComponent
  }

  WithAuthorization.propTypes = {
    token: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }

  const mapStateToProps = state => ({
    token: state.auth.token,
    role: state.auth.user.role,
  })

  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
