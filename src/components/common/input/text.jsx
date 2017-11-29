import React from 'react'
import PropTypes from 'prop-types'
import { Input, Alert } from 'element-react'

const TextInput = ({
  input,
  type,
  label,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }
    <Input
      {...input}
      name={input.name}
      type={type}
      placeholder={placeholder}
    />
    {touched &&
      ((error &&
        <Alert title={error} type='error' closable={false} />) ||
        (warning &&
          <Alert title={warning} type='warning' closable={false} />))}
  </div>
)

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
}

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  label: '',
}

export default TextInput
