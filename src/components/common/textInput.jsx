import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'element-react'

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
