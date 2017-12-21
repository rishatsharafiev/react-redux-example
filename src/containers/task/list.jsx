import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presentational from 'components/task/list'
import * as actions from 'actions/task'
import * as selectors from 'selectors/task/list'

class List extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleCurrentChange = this.handleCurrentChange.bind(this)
  }

  handleCurrentChange(item) {
    this.props.actions.changeCurrentPage(item)
  }

  render() {
    return <Presentational {...this.props} handleCurrentChange={this.handleCurrentChange} />
  }
}

function mapStateToProps(state) {
  return {
    data: selectors.data(state),
    total: selectors.total(state),
    pageSize: selectors.pageSize(state),
    currentPage: selectors.currentPage(state),
    isLoading: selectors.isLoading(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
