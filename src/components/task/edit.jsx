import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Layout, Form, Button, Tag, Icon, Loading } from 'element-react'
import routerHistory from 'utils/history'
import { required, length10 } from 'utils/validate'
import moment from 'utils/moment'
import InputText from 'components/common/input/text'
import InputTextArea from 'components/common/input/textarea'
import SelectFilter from 'components/common/select/filter'
import CheckboxDefault from 'components/common/checkbox/default'
import DatePickerDefault from 'components/common/datapicker/default'
import VerificationDialog from 'containers/verification/dialog'
import ViolationDialog from 'containers/violation/dialog'
import CancelTaskDialog from 'containers/task/dialog'
import ScannerAdd from 'containers/scanner/add'

const Dumb = ({
  task,
  scanner,
  city,
  shop,
  verification,
  violation,
  handleSubmit,
  submitting,
  invalid,
  error,
  actions: {
    editTask,
    openVerificationDialog,
    openViolationDialog,
    openCancelDialog,
    toggleScannerButton,
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
        {!task.status && task.status !== 0 &&
          <Loading text='Загрузка данных...'>
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
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
          </Loading>
        }

        {/* Статус: задача отменена */}
        {task.status === 0 &&
          <div>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Статус'>
                  <Tag type='primary'>Отмена</Tag>
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
            { task.started_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время начала'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            { task.finished_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время завершения'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Проверки'>
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Нарушения'>
                  <Button size='small' nativeType='button' onClick={openViolationDialog}>Список нарушений</Button>
                  <Field
                    name='violation_types'
                    component={CheckboxDefault}
                    options={violation.data}
                    handleCheckboxChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='16'>
                <Form.Item label='Комментарий к нарушениям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button className='btn' nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

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
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button className='btn' nativeType='button' onClick={() => { routerHistory.push('/tasks') }}> На главную</Button>
                <Button className='btn' nativeType='button' type='primary' onClick={openCancelDialog}>Отменить</Button>
                <Button className='btn' nativeType='submit' disabled={submitting || invalid}>Сохранить</Button>
                <Button className='btn' nativeType='button' disabled={submitting || invalid} type='warning' onClick={handleStatusChange}>Начать</Button>
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
            { task.started_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время начала'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            { task.finished_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время завершения'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Проверки'>
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Нарушения'>
                  <Button size='small' nativeType='button' onClick={openViolationDialog}>Список нарушений</Button>
                  <Field
                    name='violation_types'
                    component={CheckboxDefault}
                    options={violation.data}
                    handleCheckboxChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='20' lg='16'>
                <Form.Item label='Комментарий к нарушениям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='12' lg='8'>
                <Form.Item label='Табельный номер сотрудника'>
                  <Field name='signature' component={InputText} autocomplete='off' validate={[length10]} placeholder='Введите табельный номер' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='12' lg='12'>
                <Form.Item label='Сканнер табельного номера'>
                  { scanner && !scanner.toggle &&
                    <div>
                      <Button nativeType='button' type='success' size='small' onClick={() => { toggleScannerButton(true) }}>Включить сканнер</Button>
                    </div>
                  }
                  { scanner && scanner.toggle &&
                    <div>
                      <Button nativeType='button' type='danger' size='small' onClick={() => { toggleScannerButton(false) }}>Выключить сканнер</Button>
                      <ScannerAdd />
                    </div>
                  }
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button className='btn' nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
                <Button className='btn' nativeType='button' type='primary' onClick={openCancelDialog}>Отменить</Button>
                <Button className='btn' nativeType='submit' disabled={submitting || invalid}>Сохранить</Button>
                <Button className='btn' nativeType='button' disabled={submitting || invalid} type='danger' onClick={handleStatusChange}>Завершить</Button>
              </Layout.Col>
            </Layout.Row>
          </div>
        }

        {/* Статус: исправление замечаний */}
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
            { task.started_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время начала'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            { task.finished_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время завершения'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Проверки'>
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Нарушения'>
                  <Button size='small' nativeType='button' onClick={openViolationDialog}>Список нарушений</Button>
                  <Field
                    name='violation_types'
                    component={CheckboxDefault}
                    options={violation.data}
                    handleCheckboxChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='20' lg='16'>
                <Form.Item label='Комментарий к нарушениям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='12' lg='8'>
                <Form.Item label='Табельный номер сотрудника'>
                  <Field name='signature' component={InputText} autocomplete='off' validate={[length10]}placeholder='Введите табельный номер' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='left' align='top'>
              <Layout.Col xs='24' sm='24' md='12' lg='12'>
                <Form.Item label='Сканнер табельного номера'>
                  { scanner && !scanner.toggle &&
                    <div>
                      <Button nativeType='button' type='success' size='small' onClick={() => { toggleScannerButton(true) }}>Включить сканнер</Button>
                    </div>
                  }
                  { scanner && scanner.toggle &&
                    <div>
                      <Button nativeType='button' type='danger' size='small' onClick={() => { toggleScannerButton(false) }}>Выключить сканнер</Button>
                      <ScannerAdd />
                    </div>
                  }
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button className='btn' nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
                <Button className='btn' nativeType='button' type='primary' onClick={openCancelDialog}>Отменить</Button>
                <Button className='btn' nativeType='submit' disabled={submitting || invalid}>Сохранить</Button>
                <Button className='btn' nativeType='button' disabled={submitting || invalid} type='success' onClick={handleStatusChange}>Закрыть</Button>
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
                  <Tag type='success'>Завершена</Tag>
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
            { task.started_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время начала'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            { task.finished_at &&
              <Layout.Row type='flex' justify='center' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Дата и время завершения'>
                    <Icon name='time' />
                    <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY HH:mm:ss')}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Проверки'>
                  <Button size='small' nativeType='button' onClick={openVerificationDialog}>Список проверок</Button>
                  <Field
                    name='verification_types'
                    component={CheckboxDefault}
                    options={verification.data}
                    validate={required}
                    handleCheckboxChange={handleVerificationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Form.Item label='Нарушения'>
                  <Button size='small' nativeType='button' onClick={openViolationDialog}>Список нарушений</Button>
                  <Field
                    name='violation_types'
                    component={CheckboxDefault}
                    options={violation.data}
                    handleCheckboxChange={handleViolationChange}
                  />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='16'>
                <Form.Item label='Комментарий к нарушениям'>
                  <Field name='violation_comment' component={InputTextArea} autocomplete='off' placeholder='Введите ваши комментарии' />
                </Form.Item>
              </Layout.Col>
            </Layout.Row>
            { task.employee && task.employee.full_name &&
              <Layout.Row type='flex' justify='left' align='top'>
                <Layout.Col xs='24' sm='24' md='24' lg='24'>
                  <Form.Item label='Сотрудник'>
                    <span style={{ marginLeft: '10px' }}>{task.employee.full_name}</span>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            }
            <Layout.Row type='flex' justify='center' align='top'>
              <Layout.Col xs='24' sm='24' md='24' lg='24'>
                <Button className='btn' nativeType='button' onClick={() => { routerHistory.goBack() }}> На главную</Button>
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

      <VerificationDialog />
      <ViolationDialog />
      <CancelTaskDialog />
    </Layout.Col>
  </Layout.Row>
)

Dumb.propTypes = {
  task: PropTypes.object.isRequired,
  scanner: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired,
  verification: PropTypes.object.isRequired,
  violation: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
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
  // keepDirtyOnReinitialize: true,
  destroyOnUnmount: false,
}

export default reduxForm(reduxFormConfig)(Dumb)
