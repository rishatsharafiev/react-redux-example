import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/auth'
import Dumb from 'components/auth/login'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(Dumb)
