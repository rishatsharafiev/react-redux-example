import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { Form, Button } from 'element-react'
import TextInput from 'components/common/textInput'

const LoginForm = (props) => {
  const { handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label='Username'>
        <Field name='username' component={TextInput} type='text' />
      </Form.Item>
      <Form.Item label='Password'>
        <Field name='password' component={TextInput} type='password' />
      </Form.Item>
      <Button nativeType='submit'>Submit</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const LoginFormHOC = reduxForm({
  form: 'login',
})

export default LoginFormHOC(LoginForm)
