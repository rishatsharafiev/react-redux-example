import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as actions from 'actions/task'
import Dumb from 'components/scanner/add'

const Smart = props => <Dumb {...props} />

// function mapStateToProps(state) {
//   return {}
// }

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),
// })

export default connect(null, null)(Smart)
