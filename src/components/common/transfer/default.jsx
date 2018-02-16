import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transfer, Tag, Icon } from 'element-react'

class Dumb extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    handleTransferChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      value: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value })
    this.props.handleTransferChange(value)
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning },
      options,
    } = this.props

    const { value } = this.state

    return (
      <div>
        { label && <label htmlFor={input.name}>{label}</label> }

        <div>
          <Transfer
            propsAlias={{
              key: 'value',
              label: 'label',
            }}
            {...input}
            value={value}
            onChange={this.handleChange}
            data={options}
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
}

export default Dumb
