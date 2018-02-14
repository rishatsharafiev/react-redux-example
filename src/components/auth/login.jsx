import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Tag, Icon } from 'element-react'
import { required, email, minLength8, maxLength30, alphaNumeric } from 'utils/validate'
import InputText from 'components/common/input/text'

const Dumb = ({
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    login,
  },
}) => (
  <div>
    <h1>Войти</h1>
    <Form onSubmit={handleSubmit(login)}>
      <Form.Item label='E-mail'>
        <Field name='email' component={InputText} autocomplete='off' placeholder='Введите e-mail' validate={[required, email]} />
      </Form.Item>
      <Form.Item label='Пароль'>
        <Field name='password' component={InputText} type='password' autocomplete='off' placeholder='Введите пароль' validate={[required, alphaNumeric, minLength8, maxLength30]} />
      </Form.Item>
      <Button nativeType='submit' disabled={pristine || submitting || invalid}>Войти</Button>
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

Dumb.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

Dumb.defaultProps = {
  error: {},
}

export default Dumb
