import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Tag, Icon } from 'element-react'

const Dumb = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div>
    { label && <label htmlFor={input.name}>{label}</label> }
    <DatePicker
      isShowTime
      placeholder={placeholder}
      onChange={(date) => {
        console.debug('DatePicker1 changed: ', date)
      }}
      disabledDate={time => time.getTime() < Date.now() - 8.64e7}
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
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
}

Dumb.defaultProps = {
  label: '',
  placeholder: '',
}

export default Dumb
