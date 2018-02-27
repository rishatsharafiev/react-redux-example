import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Layout, Form, Button, Tag, Icon } from 'element-react'
import InputTextArea from 'components/common/input/textarea'
import SelectFilter from 'components/common/select/filter'
import TransferDefault from 'components/common/transfer/default'
import DatePickerDefault from 'components/common/datapicker/default'
import routerHistory from 'utils/history'
import { required } from 'utils/validate'
import moment from 'utils/moment'

const Dumb = ({
  task,
  city,
  shop,
  verification,
  violation,
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
  actions: {
    editTask,
  },
  handleCitySelectChange,
  handleVerificationChange,
  handleViolationChange,
  handleStatusChange,
}) => (
  <Layout.Row type='flex' justify='center' align='top'>
    <Layout.Col xs='24' sm='22' md='22' lg='12'>
      <h1>Изменить заявку</h1>
      <Form onSubmit={handleSubmit(editTask)}>
        {/* Статус: неизвестен */}
        {!task.status &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='gray'>...</Tag>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
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
                <Form.Item label='Проверки'>
                  <Field
                    name='verification_types'
                    component={TransferDefault}
                    options={verification.data || task.verification_types_selected}
                    validate={required}
                    handleTransferChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

        {/* Статус: задача отменена */}
        {task.status === 0 && <Tag type='primary'>Отменен</Tag> }

        {/* Статус: планируемая проверка */}
        {task.status === 1 &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='gray'>Планируется</Tag>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
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
                <Form.Item label='Проверки'>
                  <Field
                    name='verification_types'
                    component={TransferDefault}
                    options={verification.data || task.verification_types_selected}
                    validate={required}
                    handleTransferChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button nativeType='button' onClick={() => { routerHistory.push('/tasks') }}> На главную</Button>
                <Button nativeType='submit' disabled={pristine || submitting || invalid}>Сохранить</Button>
                <Button nativeType='button' type='warning' onClick={handleStatusChange}>Начать</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

        {/* Статус: идет проверка */}
        {task.status === 2 &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='warning'>Идет проверка</Tag>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
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
                <Form.Item label='Дата и время начала'>
                  <Icon name='time' />
                  <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
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
                    handleTransferChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Замечания'>
                  <Field
                    name='violation_types'
                    component={TransferDefault}
                    options={violation.data || task.violation_types_selected}
                    validate={required}
                    handleTransferChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Комментарий к замечаниям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
                <Button nativeType='submit' disabled={pristine || submitting || invalid}>Сохранить</Button>
                <Button nativeType='button' type='danger' onClick={handleStatusChange}>Завершить</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

        {/* Статус: выполнение задачи */}
        {task.status === 3 &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='danger'>Исправление замечаний</Tag>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
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
                <Form.Item label='Дата и время начала'>
                  <Icon name='time' />
                  <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
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
                    handleTransferChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Замечания'>
                  <Field
                    name='violation_types'
                    component={TransferDefault}
                    options={violation.data || task.violation_types_selected}
                    validate={required}
                    handleTransferChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Комментарий к замечаниям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
                <Button nativeType='submit' disabled={pristine || submitting || invalid}>Сохранить</Button>
                <Button nativeType='button' type='success' onClick={handleStatusChange}>Закрыть</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

        {/* Статус: задача завершена */}
        {task.status === 4 &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='success'>Завершено</Tag>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
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
                <Form.Item label='Дата и время начала'>
                  <Icon name='time' />
                  <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Дата и время завершения'>
                  <Icon name='time' />
                  <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
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
                    handleTransferChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Замечания'>
                  <Field
                    name='violation_types'
                    component={TransferDefault}
                    options={violation.data || task.violation_types_selected}
                    validate={required}
                    handleTransferChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Комментарий к замечаниям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
                <Button nativeType='submit' disabled={pristine || submitting || invalid}>Сохранить</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

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
  violation: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleCitySelectChange: PropTypes.func.isRequired,
  handleVerificationChange: PropTypes.func.isRequired,
  handleViolationChange: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
}

Dumb.defaultProps = {
  error: {},
}

const reduxFormConfig = {
  form: 'taskEdit',
  enableReinitialize: true,
  destroyOnUnmount: false,
}

export default reduxForm(reduxFormConfig)(Dumb)
