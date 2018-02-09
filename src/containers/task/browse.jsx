import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as selectors from 'selectors/task/browse'
import Dumb from 'components/task/browse'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(item) {
    this.props.actions.changePage(item)
  }

  render() {
    return <Dumb {...this.props} handlePageChange={this.handlePageChange} />
  }
}

function mapStateToProps(state) {
  return {
    data: selectors.data(state),
    total: selectors.total(state),
    perPage: selectors.perPage(state),
    currentPage: selectors.currentPage(state),
    isLoading: selectors.isLoading(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
