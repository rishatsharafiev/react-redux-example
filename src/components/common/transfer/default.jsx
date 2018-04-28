import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Transfer, Tag, Icon } from 'element-react'

class Dumb extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    propsAlias: PropTypes.object,
    titles: PropTypes.array,
    buttonTexts: PropTypes.array,
    options: PropTypes.array.isRequired,
    handleTransferChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: '',
    propsAlias: { key: 'value', label: 'label' },
    titles: ['Список 1', 'Список 2'],
    buttonTexts: ['Влево', 'Вправо'],
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.handleTransferChange(value)
  }

  render() {
    const {
      input,
      label,
      meta: { touched, error, warning },
      propsAlias,
      titles,
      buttonTexts,
      options,
    } = this.props

    return (
      <div>
        { label && <label htmlFor={input.name}>{label}</label> }

        <div>
          <Transfer
            {...input}
            propsAlias={propsAlias}
            value={Array.isArray(input.value) ? input.value : []}
            onChange={this.handleChange}
            data={options}
            titles={titles}
            buttonTexts={buttonTexts}
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
