import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'element-react'

const TextInput = ({ input, type, placeholder }) => (
  <div>
    <Input
      {...input}
      type={type}
      placeholder={placeholder}
    />
  </div>
)

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
}

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
}

export default TextInput
