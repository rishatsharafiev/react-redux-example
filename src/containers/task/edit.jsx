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
    this.props.actions.getVerifications()
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
    task: taskSelectors.getEditData(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  handleCitySelectChange: (event, value) => { dispatch(actions.getShopsByCityId(value)) },
  handleTransferChange: value => dispatch(change('taskEdit', 'verification_types', value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
