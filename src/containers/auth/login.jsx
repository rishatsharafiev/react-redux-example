import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import Presentational from 'components/auth/form/login'
import actions from 'actions/auth'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

const reduxFormConfig = {
  form: 'login',
}

const Container = reduxForm(reduxFormConfig)(Presentational)

export default connect(null, mapDispatchToProps)(Container)
