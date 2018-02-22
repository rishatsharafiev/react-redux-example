import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as selectors from 'selectors/task'
import Dumb from 'components/task/browse'

class Smart extends Component {
  static defaultProps = {
    currentPage: 1,
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    currentPage: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.changePage(this.props.currentPage)
  }

  handlePageChange(item) {
    this.props.actions.changePage(item)
  }

  render() {
    return <Dumb {...this.props} handlePageChange={this.handlePageChange} />
  }
}

function mapStateToProps(state) {
  // TODO: wrap meta properties in object
  return {
    data: selectors.getBrowseData(state),
    total: selectors.getBrowseTotal(state),
    perPage: selectors.getBrowsePerPage(state),
    currentPage: selectors.getBrowseCurrentPage(state),
    isLoading: selectors.getBrowseIsLoading(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
