import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Tag } from 'element-react'
import { required, email, minLength8, maxLength30, alphaNumeric } from 'utils/validate'
import TextInput from 'components/common/input/text'

const LoginForm = ({
  handleSubmit,
  submitting,
  pristine,
  valid,
  error,
  actions: {
    loginUser,
  },
}) => (
  <Form onSubmit={handleSubmit(loginUser)}>
    <Form.Item label='E-mail'>
      <Field name='email' component={TextInput} autocomplete='off' placeholder='Введите e-mail' validate={[required, email]} />
    </Form.Item>
    <Form.Item label='Пароль'>
      <Field name='password' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль' validate={[required, alphaNumeric, minLength8, maxLength30]} />
    </Form.Item>
    <Button nativeType='submit' disabled={pristine || submitting || !valid}>Войти</Button>
    <Form.Item>{error &&
      <Tag type='danger'>{error}</Tag>}
    </Form.Item>
  </Form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

LoginForm.defaultProps = {
  error: '',
}

export default LoginForm
