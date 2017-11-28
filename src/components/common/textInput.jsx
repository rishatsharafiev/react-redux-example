import React from 'react'
import { Input } from 'element-react'
import PropTypes from 'prop-types'

const TextInput = ({ input, type }) => (
  <div>
    <Input
      {...input}
      type={type}
    />
  </div>
)

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

export default TextInput
