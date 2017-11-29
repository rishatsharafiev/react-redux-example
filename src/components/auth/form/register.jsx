import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button } from 'element-react'
import TextInput from 'components/common/textInput'

const RegisterForm = (props) => {
  const { handleSubmit, actions } = props
  return (
    <Form onSubmit={handleSubmit(actions.loginUser)}>
      <Form.Item label='Имя'>
        <Field name='username' component={TextInput} type='text' autocomplete='off' placeholder='Введите имя' />
      </Form.Item>
      <Form.Item label='E-mail'>
        <Field name='email' component={TextInput} type='email' autocomplete='off' placeholder='Введите e-mail' />
      </Form.Item>
      <Form.Item label='Пароль'>
        <Field name='password' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль' />
      </Form.Item>
      <Form.Item label='Подтвердите пароль'>
        <Field name='password_confirmation' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль еще раз' />
      </Form.Item>
      <Button nativeType='submit'>Регистрация</Button>
    </Form>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
}

export default RegisterForm
