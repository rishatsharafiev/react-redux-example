import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import Presentational from 'components/auth/register'
import * as actions from 'actions/auth'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

const reduxFormConfig = {
  form: 'register',
}

const Register = reduxForm(reduxFormConfig)(Presentational)

export default connect(null, mapDispatchToProps)(Register)
