import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'element-react'

const overlayStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor:
  '#fff',
  opacity: 0.7,
}

const Overlay = ({ isLoading }) => (
  <div style={{ ...overlayStyles, display: isLoading ? 'block' : 'none' }}>
    <Icon name='loading' style={{ left: '50%', top: '50%', position: 'relative' }} />
  </div>
)

Overlay.propTypes = {
  isLoading: PropTypes.bool,
}

Overlay.defaultProps = {
  isLoading: false,
}

export default Overlay
