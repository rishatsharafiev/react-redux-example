import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/auth'

const Smart = (props) => {
  props.actions.logout()
  return (
    <div />
  )
}

Smart.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})


export default connect(null, mapDispatchToProps)(Smart)
