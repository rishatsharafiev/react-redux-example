import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { Layout, Dialog, Loading, Table, Button } from 'element-react'
// import InputText from 'components/common/input/text'

const verificationColumns = [
  {
    label: 'title',
    prop: 'label',
  },
  {
    label: 'Operations',
    render: (row, column, index) => <span><Button type='text' size='small' onClick={() => console.log('action is here')}>Удалить {index}</Button></span>,
  },
]

// const Dumb = ({
//   verification,
//   handleSubmit,
//   submitting,
//   pristine,
//   invalid,
//   error,
//   actions: {
//     addVerification,
//   },
//   handleVerificationChange,
// })
const Dumb = ({
  data,
  isLoading,
  isVisible,
  actions: {
    closeVerificationDialog,
  },
}) => (
  <Dialog
    title='Проверки'
    visible={isVisible}
    size='large'
    onCancel={closeVerificationDialog}
  >
    <Dialog.Body>
      <Layout.Row type='flex' justify='left' align='top'>
        <Layout.Col xs='24' sm='18' md='12' lg='6'>
          {
            (isLoading)
              ? <Loading text='Загрузка данных...'><Table
                columns={verificationColumns}
                width='100%'
                resizable
                data={data}
                border
                maxHeight={250}
              /></Loading>
              : <Table
                columns={verificationColumns}
                width='100%'
                resizable
                data={data}
                border
                maxHeight={250}
              />
          }

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
  // handleSubmit: PropTypes.func.isRequired,
  // submitting: PropTypes.bool.isRequired,
  // pristine: PropTypes.bool.isRequired,
  // invalid: PropTypes.bool.isRequired,
  // error: PropTypes.object,
  // handleVerificationChange: PropTypes.func.isRequired,
}

const reduxFormConfig = {
  form: 'verificationAdd',
  enableReinitialize: true,
  destroyOnUnmount: false,
}

export default reduxForm(reduxFormConfig)(Dumb)
