import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Tag, Icon } from 'element-react'
import moment from 'utils/moment'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }

    <div>
      <DatePicker
        {...input}
        value={input.value ? moment(input.value).toDate() : null}
        isShowTime
        placeholder={placeholder}
        disabledDate={datetime => datetime.getTime() < Date.now() - 8.64e7}
      />
    </div>

    {touched &&
      ((error &&
        <Tag type='danger'><Icon name='warning' /> {error}</Tag>) ||
        (warning &&
          <Tag type='warning'><Icon name='warning' /> {warning}</Tag>))}
  </div>
)

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
