// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/task'
import * as taskSelectors from 'selectors/task'
import Dumb from 'components/task/dialog'

// class Smart extends Component {
//   static propTypes = {
//     actions: PropTypes.object.isRequired,
//   }

//   render() {
//     return <Dumb {...this.props} />
//   }
// }

function mapStateToProps(state) {
  return {
    isVisible: taskSelectors.getDialogIsVisible(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dumb)
