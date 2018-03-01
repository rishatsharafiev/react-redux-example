import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as verificationSelectors from 'selectors/verification'
import Dumb from 'components/verification/dialog'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.getVerifications()
  }

  render() {
    return <Dumb {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    data: verificationSelectors.getBrowseData(state),
    isLoading: verificationSelectors.getBrowseIsLoading(state),
    isVisible: verificationSelectors.getDialogIsVisible(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
