import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Layout, Card, Form, Button, Tag, Icon } from 'element-react'
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
  <Layout.Row type='flex' justify='center'>
    <Layout.Col lg='10'>
      <Card>
        <h1>Войти</h1>
        <Form onSubmit={handleSubmit(loginUser)}>
          <Form.Item label='E-mail'>
            <Field name='email' component={TextInput} autocomplete='off' placeholder='Введите e-mail' validate={[required, email]} />
          </Form.Item>
          <Form.Item label='Пароль'>
            <Field name='password' component={TextInput} type='password' autocomplete='off' placeholder='Введите пароль' validate={[required, alphaNumeric, minLength8, maxLength30]} />
          </Form.Item>
          <Button nativeType='submit' disabled={pristine || submitting || !valid}>Войти</Button>
          <Form.Item>{error &&
            <Tag type='danger'><Icon name='warning' /> {error}</Tag>}
          </Form.Item>
        </Form>
      </Card>
    </Layout.Col>
  </Layout.Row>
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
