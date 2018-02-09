import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from 'actions/auth'
import Dumb from 'components/auth/register'

const reduxFormConfig = {
  form: 'register',
}

const Smart = reduxForm(reduxFormConfig)(Dumb)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(null, mapDispatchToProps)(Smart)
