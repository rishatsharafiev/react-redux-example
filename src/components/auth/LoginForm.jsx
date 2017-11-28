import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'element-react'
import TextInput from 'components/common/textInput'

const LoginForm = (props) => {
  const { handleSubmit, actions } = props
  return (
    <Form onSubmit={handleSubmit(actions.loginUser)}>
      <Form.Item label='Username'>
        <Field name='username' component={TextInput} type='text' autocomplete='off' />
      </Form.Item>
      <Form.Item label='Password'>
        <Field name='password' component={TextInput} type='password' autocomplete='off' />
      </Form.Item>
      <Button nativeType='submit'>Submit</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

const LoginFormHOC = reduxForm({
  form: 'login',
})(LoginForm)

export default LoginFormHOC
