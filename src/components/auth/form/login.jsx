import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button } from 'element-react'
import TextInput from 'components/common/textInput'

const LoginForm = (props) => {
  const {
    handleSubmit,
    actions: {
      loginUser,
    },
  } = props

  return (
    <Form onSubmit={handleSubmit(loginUser)}>
      <Form.Item label='E-mail'>
        <Field name='email' component={TextInput} type='email' autocomplete='off' placeholder='Введите e-mail' />
      </Form.Item>
      <Form.Item label='Пароль'>
        <Field name='password' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль' />
      </Form.Item>
      <Button nativeType='submit'>Войти</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

export default LoginForm
