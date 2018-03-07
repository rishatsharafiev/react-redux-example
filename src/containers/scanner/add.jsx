import React from 'react'
import { connect } from 'react-redux'
import { updateScanner } from 'actions/task'
import Dumb from 'components/scanner/add'

const Smart = props => <Dumb {...props} />

const mapDispatchToProps = dispatch => ({
  handleChange: (action) => { dispatch(updateScanner(action)) },
})

export default connect(null, mapDispatchToProps)(Smart)
