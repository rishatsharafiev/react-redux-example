import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'element-react'
import routerHistory from 'utils/history'

const Authorization = (
  allowedRoles = null,
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
    const RedirectComponent = Component ? <Component {...props} /> : <DefaultComponent />
    const isTokenProvided = Boolean(props.token)
    return (isTokenProvided && !allowedRoles) ||
      (isTokenProvided && Boolean(allowedRoles) && allowedRoles.includes(props.role)) ?
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
