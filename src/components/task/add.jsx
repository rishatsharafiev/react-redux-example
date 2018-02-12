import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Layout, Form, Button, Tag, Icon } from 'element-react'
import SelectDefault from 'components/common/select/default'
import SelectMultiple from 'components/common/select/multiple'
import DatePickerDefault from 'components/common/datapicker/default'
import routerHistory from 'utils/history'
import { required } from 'utils/validate'

const Dumb = ({
  city,
  shop,
  verification,
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    addTask,
  },
  handleCitySelectChange,
}) => (
  <div>
    <h1>Новая заявка</h1>
    <Form onSubmit={handleSubmit(addTask)}>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='10' md='10' lg='9'>
          <Form.Item label='Город'>
            <Field
              name='city'
              component={SelectDefault}
              options={city.data}
              loading={city.isLoading}
              onChange={handleCitySelectChange}
              loadingText='Загрузка данных'
              placeholder='Выбрать город'
              validate={required}
            />
          </Form.Item>
        </Layout.Col>
        <Layout.Col xs='24' sm='10' md='10' lg='9'>
          <Form.Item label='Магазин'>
            <Field
              name='shop'
              component={SelectDefault}
              options={shop.data}
              loading={shop.isLoading}
              placeholder='Выбрать магазин'
              validate={required}
            />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='24' md='24' lg='24'>
          <Form.Item label='Проверки'>
            <Field
              name='verification_types'
              component={SelectMultiple}
              options={verification.data}
              loading={verification.isLoading}
              placeholder='Выбрать проверки'
              validate={required}
            />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row gutter='10'>
        <Layout.Col xs='24' sm='24' md='24' lg='24'>
          <Form.Item label='Плановая дата'>
            <Field
              name='planned_at'
              component={DatePickerDefault}
              placeholder='Выберите дату и время'
              validate={required}
            />
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
  city: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleCitySelectChange: PropTypes.func.isRequired,
}

Dumb.defaultProps = {
  error: {},
}

export default Dumb
