import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from 'actions/task'
import * as selectors from 'selectors/task/add'
import Dumb from 'components/task/add'

class Smart extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.getCities()
    // this.props.actions.getVerifications()
  }

  render() {
    return <Dumb {...this.props} />
  }
}

const reduxFormConfig = {
  form: 'taskAdd',
}

const Smarter = reduxForm(reduxFormConfig)(Smart)

function mapStateToProps(state) {
  return {
    city: {
      data: selectors.data(state),
      isLoading: selectors.isLoading(state),
    },
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smarter)
