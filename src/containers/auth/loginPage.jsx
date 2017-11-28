import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from 'components/auth/LoginForm'
import actions from 'actions/auth'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

const LoginPage = connect(
  null,
  mapDispatchToProps,
)(LoginForm)

export default LoginPage
