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
    const { token, roleName } = props
    const isTokenProvided = Boolean(token)
    const allowedRolesList = allowedRoles || ['guest']
    const newProps = {}
    Object.keys(props).forEach((key) => {
      if (!(key === 'token' || key === 'roleName')) newProps[key] = props[key]
    })

    if (isTokenProvided && !allowedRolesList) {
      return <WrappedComponent {...newProps} />
    } else if (
      isTokenProvided &&
      Boolean(allowedRolesList) &&
      allowedRolesList.includes(roleName)
    ) {
      return <WrappedComponent {...newProps} />
    } else if (!loggedIn && !isTokenProvided) {
      return <WrappedComponent {...newProps} />
    }

    return Component ? <Component {...newProps} /> : <DefaultComponent />
  }

  WithAuthorization.propTypes = {
    token: PropTypes.string,
    roleName: PropTypes.string,
  }

  WithAuthorization.defaultProps = {
    token: '',
    roleName: '',
  }


  const mapStateToProps = state => ({
    token: state.auth.token,
    roleName: state.app.user.role_name,
  })

  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
