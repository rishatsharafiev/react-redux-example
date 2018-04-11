import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Button } from 'element-react'

const Dumb = ({
  isVisible,
  actions: {
    closeCancelDialog,
    updateStatus,
  },
}) => {
  const handleCancellation = () => {
    updateStatus(0)
    closeCancelDialog()
  }

  return (
    <Dialog
      title='Отмена'
      visible={isVisible}
      size='large'
      onCancel={closeCancelDialog}
    >
      <Dialog.Body>
        <span>Отменить заявку?</span>
      </Dialog.Body>
      <Dialog.Footer className='dialog-footer'>
        <Button className='btn' nativeType='button' onClick={closeCancelDialog}>Нет</Button>
        <Button className='btn' nativeType='button' type='primary' onClick={handleCancellation}>Да</Button>
      </Dialog.Footer>
    </Dialog>
  )
}

Dumb.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
}

export default Dumb
