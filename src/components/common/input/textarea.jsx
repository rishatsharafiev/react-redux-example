import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tag, Icon } from 'element-react'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
  autosize,
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }
    <Input
      {...input}
      name={input.name}
      type='textarea'
      autosize={autosize}
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
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  autosize: PropTypes.object,
}

Dumb.defaultProps = {
  placeholder: '',
  label: '',
  autosize: { minRows: 6, maxRows: 6 },
}

export default Dumb
