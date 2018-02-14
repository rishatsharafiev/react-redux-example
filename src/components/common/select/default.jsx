import React from 'react'
import PropTypes from 'prop-types'
import { Select, Tag, Icon } from 'element-react'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
  options,
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }

    <div>
      <Select {...input} placeholder={placeholder}>
        {
          options.map(option =>
            (<Select.Option
              key={option.value}
              label={option.label}
              value={option.value}
            />))
        }
      </Select>
    </div>

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
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
}

Dumb.defaultProps = {
  label: '',
  placeholder: 'Выбрать',
}

export default Dumb
