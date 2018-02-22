import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Tag, Icon } from 'element-react'
import moment from 'utils/moment'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
}) => {
  const newValue = input.value ? moment(input.value).toDate() : null

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
}

Dumb.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
}

export default Dumb
