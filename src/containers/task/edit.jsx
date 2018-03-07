import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { change } from 'redux-form'
import * as actions from 'actions/task'
import * as taskSelectors from 'selectors/task'
import * as citySelectors from 'selectors/city'
import * as shopSelectors from 'selectors/shop'
import * as verificationSelectors from 'selectors/verification'
import * as violationSelectors from 'selectors/violation'
import * as scannerSelectors from 'selectors/scanner'
import Dumb from 'components/task/edit'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props
    this.props.actions.getTaskById(id)
    // TODO: запускать при условии, что статус не FINISHED, в sagas/task
    this.props.actions.getCities()
    this.props.actions.getShopsByCityId()
    this.props.actions.getVerifications()
    this.props.actions.getViolations()
  }

  render() {
    return <Dumb {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    city: {
      data: citySelectors.getBrowseData(state),
      isLoading: citySelectors.getBrowseIsLoading(state),
    },
    shop: {
      data: shopSelectors.getBrowseData(state),
      isLoading: shopSelectors.getBrowseIsLoading(state),
    },
    verification: {
      data: verificationSelectors.getBrowseData(state),
      isLoading: verificationSelectors.getBrowseIsLoading(state),
    },
    violation: {
      data: violationSelectors.getBrowseData(state),
      isLoading: violationSelectors.getBrowseIsLoading(state),
    },
    task: taskSelectors.getEditFormData(state),
    scanner: scannerSelectors.getReadData(state),
    initialValues: taskSelectors.getEditInitialData(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  handleCitySelectChange: (event, value) => { dispatch(actions.getShopsByCityId(value)) },
  handleVerificationChange: value => dispatch(change('taskEdit', 'verification_types', value)),
  handleViolationChange: value => dispatch(change('taskEdit', 'violation_types', value)),
  handleStatusChange: () => { dispatch(actions.updateStatus()) },
  handleCancellation: () => { dispatch(actions.updateStatus(0)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
