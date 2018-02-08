import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Presentational from 'components/task/page'

class List extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    const {
      match: {
        params: {
          id,
        },
      },
    } = props
    console.log(id)
  }

  render() {
    return <Presentational {...this.props} />
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
