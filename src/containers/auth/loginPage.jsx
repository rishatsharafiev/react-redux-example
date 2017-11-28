import React, { Component } from 'react'
import LoginForm from 'components/auth/LoginForm'

class LoginPage extends Component {
  handleSubmit = (values) => {
    console.log(values)
  }
  render() {
    return <LoginForm onSubmit={this.handleSubmit} />
  }
}

export default LoginPage
