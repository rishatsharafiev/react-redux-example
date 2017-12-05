import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Permission = (props) => {
  const {
    allowedRoles,
    children,
    token,
    role,
  } = props
  const isTokenProvided = Boolean(token)
  if ((isTokenProvided && !allowedRoles) ||
    (isTokenProvided && Boolean(allowedRoles) && allowedRoles.includes(role))) {
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
}

Permission.defaultProps = {
  allowedRoles: null,
}

const mapStateToProps = state => ({
  token: state.auth.token,
  role: state.auth.user.role,
})

export default connect(mapStateToProps)(Permission)
