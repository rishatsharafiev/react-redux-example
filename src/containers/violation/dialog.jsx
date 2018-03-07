import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as violationSelectors from 'selectors/violation'
import Dumb from 'components/violation/dialog'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.getViolations()
  }

  render() {
    return <Dumb {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    data: violationSelectors.getBrowseData(state),
    isLoading: violationSelectors.getBrowseIsLoading(state),
    isVisible: violationSelectors.getDialogIsVisible(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
