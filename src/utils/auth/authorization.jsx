import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'element-react'
import routerHistory from 'utils/history'

const Authorization = (
  allowedRoles = null,
  loggedIn = true,
  Component = null,
) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const DefaultComponent = () => (
      <div>
        <h1>Доступ к странице запрещен</h1>
        <Button onClick={() => { routerHistory.push('/') }}>На главную</Button>
        <Button onClick={routerHistory.goBack}>Назад</Button>
      </div>
    )
    const isTokenProvided = Boolean(props.token)
    const allowedRolesList = allowedRoles || ['guest']
    if (isTokenProvided && !allowedRolesList) {
      return <WrappedComponent {...props} />
    } else if (
      isTokenProvided &&
      Boolean(allowedRolesList) &&
      allowedRolesList.includes(props.role)
    ) {
      return <WrappedComponent {...props} />
    } else if (!loggedIn && !isTokenProvided) {
      return <WrappedComponent {...props} />
    }

    return Component ? <Component {...props} /> : <DefaultComponent />
  }

  WithAuthorization.propTypes = {
    token: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }

  const mapStateToProps = state => ({
    token: state.auth.token,
    role: state.app.user.role,
  })

  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
