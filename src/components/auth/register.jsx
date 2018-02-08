import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Tag, Icon } from 'element-react'
import { required, email, minLength2, minLength8, maxLength30, alphaNumeric, russianName } from 'utils/validate'
import { firstUpperNextLowerCase } from 'utils/normalize'
import TextInput from 'components/common/input/text'

const RegisterForm = ({
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    register,
  },
}) => (
  <div>
    <h1>Регистрация</h1>
    <Form onSubmit={handleSubmit(register)}>
      <Form.Item label='Имя'>
        <Field name='name' component={TextInput} type='text' autocomplete='off' placeholder='Введите имя' validate={[required, russianName, minLength2, maxLength30]} normalize={firstUpperNextLowerCase} />
      </Form.Item>
      <Form.Item label='E-mail'>
        <Field name='email' component={TextInput} type='email' autocomplete='off' placeholder='Введите e-mail' validate={[required, email]} />
      </Form.Item>
      <Form.Item label='Пароль'>
        <Field name='password' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль' validate={[required, alphaNumeric, minLength8, maxLength30]} />
      </Form.Item>
      <Form.Item label='Подтвердите пароль'>
        <Field name='password_confirmation' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль еще раз' validate={[required, alphaNumeric, minLength8, maxLength30]} />
      </Form.Item>
      <Button nativeType='submit' disabled={pristine || submitting || invalid}>Регистрация</Button>
      {!error.errors && error.message &&
        <Form.Item>
          <Tag type='danger'><Icon name='warning' /> {error.message}</Tag>
        </Form.Item>
      }
      {error.errors && error.errors[0] &&
        error.errors.map(item => (
          <Form.Item key={item} >
            <Tag type='danger'><Icon name='warning' /> {item}</Tag>
          </Form.Item>
        ))
      }
    </Form>
  </div>
)

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

RegisterForm.defaultProps = {
  error: {},
}

export default RegisterForm
