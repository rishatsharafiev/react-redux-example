import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transfer, Tag, Icon } from 'element-react'

class Dumb extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    propsAlias: PropTypes.object,
    options: PropTypes.array.isRequired,
    selectedValue: PropTypes.array,
    selectedOptions: PropTypes.array,
    handleTransferChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    selectedValue: [],
    selectedOptions: [],
    propsAlias: { key: 'value', label: 'label' },
  }

  constructor(props) {
    super(props)

    this.state = {
      value: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.handleTransferChange(value)
    this.setState({ value })
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning },
      propsAlias,
      options,
      selectedValue,
      selectedOptions,
    } = this.props

    const { value } = this.state

    return (
      <div>
        { label && <label htmlFor={input.name}>{label}</label> }

        <div>
          <Transfer
            {...input}
            propsAlias={propsAlias}
            value={value.length ? value : selectedValue}
            onChange={this.handleChange}
            data={options.length ? options : selectedOptions}
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
