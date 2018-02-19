import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Layout, Form, Button, Tag, Icon } from 'element-react'
import SelectFilter from 'components/common/select/filter'
import TransferDefault from 'components/common/transfer/default'
import DatePickerDefault from 'components/common/datapicker/default'
import routerHistory from 'utils/history'
import { required } from 'utils/validate'

const Dumb = ({
  task,
  city,
  shop,
  verification,
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    editTask,
  },
  handleCitySelectChange,
  handleTransferChange,
}) => (
  <Layout.Row type='flex' justify='center' align='top'>
    <Layout.Col xs='24' sm='12' md='12' lg='12'>
      <h1>Изменить заявку</h1>
      <Form onSubmit={handleSubmit(editTask)}>
        <Layout.Row type='flex' justify='center' align='top'>
          <Layout.Col xs='24' sm='24' md='24' lg='24'>
            <Form.Item label='Город'>
              <Field
                name='city'
                component={SelectFilter}
                options={city.data}
                loading={city.isLoading}
                onChange={handleCitySelectChange}
                loadingText='Загрузка данных'
                placeholder='Выбрать город'
                validate={required}
              />
            </Form.Item>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row type='flex' justify='center' align='top'>
          <Layout.Col xs='24' sm='24' md='24' lg='24'>
            <Form.Item label='Магазин'>
              <Field
                name='shop'
                component={SelectFilter}
                options={shop.data}
                disabled={shop.isLoading}
                loading={shop.isLoading}
                placeholder='Выбрать магазин'
                validate={required}
              />
            </Form.Item>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row type='flex' justify='center' align='top'>
          <Layout.Col xs='24' sm='24' md='24' lg='24'>
            <Form.Item label='Проверки'>
              <Field
                name='verification_types'
                component={TransferDefault}
                options={verification.data || task.verification_types_selected}
                validate={required}
                handleTransferChange={handleTransferChange}
              />
            </Form.Item>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row type='flex' justify='center' align='top'>
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
        <Layout.Row type='flex' justify='center' align='top'>
          <Layout.Col xs='24' sm='24' md='24' lg='24'>
            <Button nativeType='button' onClick={() => { routerHistory.goBack() }}> Назад</Button>
            <Button nativeType='submit' disabled={pristine || submitting || invalid}>Создать</Button>
          </Layout.Col>
        </Layout.Row>
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
    </Layout.Col>
  </Layout.Row>
)

Dumb.propTypes = {
  task: PropTypes.object.isRequired,
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
  handleTransferChange: PropTypes.func.isRequired,
}

Dumb.defaultProps = {
  error: {},
}

const reduxFormConfig = {
  form: 'taskEdit',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
}

export default reduxForm(reduxFormConfig)(Dumb)
