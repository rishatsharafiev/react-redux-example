import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Permission = (props) => {
  const {
    allowedRoles,
    children,
    token,
    roleName,
    loggedIn,
  } = props

  const isTokenProvided = Boolean(token)
  const allowedRolesList = allowedRoles || ['guest']
  if (isTokenProvided && Boolean(allowedRolesList) && allowedRolesList.includes(roleName)) {
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
  token: PropTypes.string,
  roleName: PropTypes.string,
  loggedIn: PropTypes.bool,
}

Permission.defaultProps = {
  allowedRoles: null,
  loggedIn: true,
  roleName: '',
  token: '',
}

const mapStateToProps = state => ({
  token: state.auth.token,
  roleName: state.app.user.role_name,
})

export default connect(mapStateToProps)(Permission)
