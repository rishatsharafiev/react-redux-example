import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Layout, Card, Form, Button, Tag, Icon } from 'element-react'
import { required, email, minLength2, minLength8, maxLength30, alphaNumeric, russianName } from 'utils/validate'
import { firstUpperNextLowerCase } from 'utils/normalize'
import TextInput from 'components/common/input/text'

const RegisterForm = ({
  handleSubmit,
  submitting,
  pristine,
  valid,
  error,
  actions: {
    registerUser,
  },
}) => (
  <Layout.Row type='flex' justify='center'>
    <Layout.Col lg='10'>
      <Card>
        <h1>Регистрация</h1>
        <Form onSubmit={handleSubmit(registerUser)}>
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
          <Button nativeType='submit' disabled={pristine || submitting || !valid}>Регистрация</Button>
          <Form.Item>{error &&
            <Tag type='danger'><Icon name='warning' /> {error}</Tag>}
          </Form.Item>
        </Form>
      </Card>
    </Layout.Col>
  </Layout.Row>
)

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

RegisterForm.defaultProps = {
  error: '',
}

export default RegisterForm
