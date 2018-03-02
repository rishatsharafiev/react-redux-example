import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import map from 'lodash/map'
import { Layout, Form, Dialog, Loading, Table, Button, Tag, Icon } from 'element-react'
import InputText from 'components/common/input/text'
import { required } from 'utils/validate'

const violationColumns = [
  {
    label: 'Название',
    prop: 'label',
  },
  {
    label: 'Удаление',
    width: 100,
    render: (row, column, index) => <span><Button type='text' size='small' onClick={() => console.log(`action is here ${index}`)}>Удалить </Button></span>,
  },
]

const Dumb = ({
  data,
  isLoading,
  isVisible,
  actions: {
    closeViolationDialog,
    addViolation,
  },
  handleSubmit,
  submitting,
  pristine,
  invalid,
  error,
}) => (
  <Dialog
    title='Проверки'
    visible={isVisible}
    size='large'
    onCancel={closeViolationDialog}
  >
    <Dialog.Body>
      <Layout.Row align='top' gutter='10' >
        <Layout.Col xs='24' sm='16' md='14' lg='10'>
          {
            (isLoading)
              ? <Loading text='Загрузка данных...'><Table
                columns={violationColumns}
                width='100%'
                resizable
                data={data}
                border
                maxHeight={250}
                style={{ marginBottom: '35px' }}
              /></Loading>
              : <Table
                columns={violationColumns}
                width='100%'
                resizable
                data={data}
                border
                maxHeight={250}
                style={{ marginBottom: '35px' }}
              />
          }
        </Layout.Col>
        <Layout.Col xs='24' sm='8' md='6' lg='6'>
          <Form onSubmit={handleSubmit(addViolation)}>
            <Form.Item>
              <Field
                name='title'
                component={InputText}
                placeholder='Введите название проверки'
                validate={required}
              />
            </Form.Item>
            {!error.errors && error.message &&
              <Form.Item>
                <Tag type='danger'><Icon name='warning' /> {error.message}</Tag>
              </Form.Item>
            }
            {error.errors &&
              map(error.errors, (items, key) => (
                map(items, (item, index) => (
                  <Form.Item key={`${key}-${index}`}>
                    <Tag type='danger'><Icon name='warning' /> {item}</Tag>
                  </Form.Item>
                ))
              ))
            }
            <Form.Item>
              <Button nativeType='submit' disabled={pristine || submitting || invalid}>Добавить</Button>
            </Form.Item>
          </Form>
        </Layout.Col>
      </Layout.Row>
    </Dialog.Body>
  </Dialog>
)

Dumb.propTypes = {
  data: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

Dumb.defaultProps = {
  error: {},
}

const reduxFormConfig = {
  form: 'violationAdd',
  enableReinitialize: true,
  destroyOnUnmount: false,
}

export default reduxForm(reduxFormConfig)(Dumb)
