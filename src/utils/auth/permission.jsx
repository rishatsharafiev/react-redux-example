import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Permission = (props) => {
  const {
    allowedRoles,
    children,
    token,
    role,
    loggedIn,
  } = props
  const isTokenProvided = Boolean(token)
  const allowedRolesList = allowedRoles || ['guest']
  if (isTokenProvided && Boolean(allowedRolesList) && allowedRolesList.includes(role)) {
    return (
      <div>
        {children}
      </div>
    )
  } else if (isTokenProvided && !allowedRolesList) {
    return (
      <div>
        {children}
      </div>
    )
  } else if (!loggedIn && !isTokenProvided) {
    return (
      <div>
        {children}
      </div>
    )
  }

  return <div />
}

Permission.propTypes = {
  allowedRoles: PropTypes.array,
  children: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
}

Permission.defaultProps = {
  allowedRoles: null,
  loggedIn: true,
}

const mapStateToProps = state => ({
  token: state.auth.token,
  role: state.app.user.role,
})

export default connect(mapStateToProps)(Permission)
