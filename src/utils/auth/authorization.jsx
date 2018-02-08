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
    const { token, role } = props
    const isTokenProvided = Boolean(token)
    const allowedRolesList = allowedRoles || ['000']
    const newProps = {}
    Object.keys(props).forEach((key) => {
      if (!(key === 'token' || key === 'role')) newProps[key] = props[key]
    })

    if (isTokenProvided && !allowedRolesList) {
      return <WrappedComponent {...newProps} />
    } else if (
      isTokenProvided &&
      Boolean(allowedRolesList) &&
      allowedRolesList.includes(role)
    ) {
      return <WrappedComponent {...newProps} />
    } else if (!loggedIn && !isTokenProvided) {
      return <WrappedComponent {...newProps} />
    }

    return Component ? <Component {...newProps} /> : <DefaultComponent />
  }

  WithAuthorization.propTypes = {
    token: PropTypes.string,
    role: PropTypes.string,
  }

  WithAuthorization.defaultProps = {
    token: '',
    role: '',
  }


  const mapStateToProps = state => ({
    token: state.auth.token,
    role: state.app.user.role,
  })

  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
