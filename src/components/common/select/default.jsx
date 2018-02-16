import React from 'react'
import PropTypes from 'prop-types'
import { Select, Tag, Icon } from 'element-react'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
  options,
  selectedValue,
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }

    <div>
      <Select {...input} placeholder={placeholder}>
        { selectedValue && selectedValue.value && selectedValue.label &&
          <Select.Option
            selected
            key={selectedValue.value}
            label={selectedValue.label}
            value={selectedValue.value}
          />
        }
        {
          options.map(option =>
            (<Select.Option
              key={option.value}
              label={option.label}
              value={option.value}
            />)
          )
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
  selectedValue: PropTypes.object,
}

Dumb.defaultProps = {
  label: '',
  placeholder: 'Выбрать',
  selectedValue: null,
}

export default Dumb
