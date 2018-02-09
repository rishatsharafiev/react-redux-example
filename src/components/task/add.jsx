import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Layout, Form, Button, Tag, Icon } from 'element-react'
import { required } from 'utils/validate'
import SelectFilter from 'components/common/select/filter'
import SelectMultiple from 'components/common/select/multiple'
import DatePickerDefault from 'components/common/datapicker/default'
import routerHistory from 'utils/history'

const options = [{
  value: 'Option1',
  label: 'Option1',
}, {
  value: 'Option2',
  label: 'Option2',
}, {
  value: 'Option3',
  label: 'Option3',
}, {
  value: 'Option4',
  label: 'Option4',
}, {
  value: 'Option5',
  label: 'Option5',
}]

const Dumb = ({
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    add,
  },
}) => (
  <div>
    <h1>Новая заявка</h1>
    <Form onSubmit={handleSubmit(add)}>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='10' md='8' lg='8'>
          <Form.Item label='Город'>
            <Field name='city' component={SelectFilter} options={options} placeholder='Выбрать город' validate={required} />
          </Form.Item>
        </Layout.Col>
        <Layout.Col xs='24' sm='10' md='8' lg='6'>
          <Form.Item label='Магазин'>
            <Field name='shop' component={SelectFilter} options={options} placeholder='Выбрать магазин' validate={required} />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='24' md='24' lg='24'>
          <Form.Item label='Проверки'>
            <Field name='verification_types' component={SelectMultiple} options={options} placeholder='Выбрать проверки' validate={required} />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='24' md='24' lg='24'>
          <Form.Item label='Плановая дата'>
            <Field name='planned_at' component={DatePickerDefault} placeholder='Выберите дату и время' validate={required} />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>
      <Button nativeType='button' onClick={() => { routerHistory.goBack() }}> Назад</Button>
      <Button nativeType='submit' disabled={pristine || submitting || invalid}>Создать</Button>
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
