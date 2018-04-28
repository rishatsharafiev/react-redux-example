import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Tag, Icon } from 'element-react'

class Dumb extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    selected: PropTypes.array,
    handleCheckboxChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    selected: [],
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.handleCheckboxChange(value)
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning },
      options,
      selected,
    } = this.props

    return (
      <div>
        { label && <label htmlFor={input.name}>{label}</label> }

        <div>
          <Checkbox.Group
            onChange={this.handleChange}
            value={
            input.value.length
              ? input.value
              : selected
          }
          >
            {
              options.map(option =>
                (
                  <Checkbox
                    key={option.value || 0}
                    label={option.label}
                    value={option.value || 0}
                    style={{ display: 'block', marginLeft: '5em' }}
                  />
                ))
            }
          </Checkbox.Group>
        </div>

        {touched &&
          ((error &&
            <Tag type='danger'><Icon name='warning' /> {error}</Tag>) ||
            (warning &&
              <Tag type='warning'><Icon name='warning' /> {warning}</Tag>))}
      </div>
    )
  }
}

export default Dumb
