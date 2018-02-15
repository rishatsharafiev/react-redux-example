import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as citySelectors from 'selectors/city'
import * as shopSelectors from 'selectors/shop'
import * as verificationSelectors from 'selectors/verification'
import Dumb from 'components/task/edit'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleCitySelectChange = this.handleCitySelectChange.bind(this)
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

  handleCitySelectChange(event, value) {
    this.props.actions.getShopsByCityId(value)
  }

  render() {
    return <Dumb {...this.props} handleCitySelectChange={this.handleCitySelectChange} />
  }
}

function mapStateToProps(state) {
  return {
    city: {
      data: citySelectors.data(state),
      isLoading: citySelectors.isLoading(state),
    },
    shop: {
      data: shopSelectors.data(state),
      isLoading: shopSelectors.isLoading(state),
    },
    verification: {
      data: verificationSelectors.data(state),
      isLoading: verificationSelectors.isLoading(state),
    },
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
