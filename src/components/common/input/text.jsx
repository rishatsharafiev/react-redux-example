import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tag, Icon } from 'element-react'

const Dumb = ({
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
        <Tag type='danger'><Icon name='warning' /> {error}</Tag>) ||
        (warning &&
          <Tag type='warning'><Icon name='warning' /> {warning}</Tag>))}
  </div>
)

Dumb.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
}

Dumb.defaultProps = {
  placeholder: '',
  type: 'text',
  label: '',
}

export default Dumb
