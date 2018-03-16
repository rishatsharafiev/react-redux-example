import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Tag, Icon } from 'element-react'
import moment from 'utils/moment'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
  selectedValue,
}) => {
  const selectedValueResult = (selectedValue) ? moment(selectedValue).toDate() : null
  const newValue = input.value ? moment(input.value).toDate() : selectedValueResult

  return (
    <div>
      { label && <label htmlFor={input.name}>{label}</label> }

      <div>
        <DatePicker
          {...input}
          value={newValue}
          isShowTime
          placeholder={placeholder}
        />
      </div>

      {touched &&
        ((error &&
          <Tag type='danger'><Icon name='warning' /> {error}</Tag>) ||
          (warning &&
            <Tag type='warning'><Icon name='warning' /> {warning}</Tag>))}
    </div>
  )
}

Dumb.defaultProps = {
  label: '',
  placeholder: '',
  selectedValue: null,
}

Dumb.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  selectedValue: PropTypes.string,
}

export default Dumb
