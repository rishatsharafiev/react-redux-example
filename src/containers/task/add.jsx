import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import * as actions from 'actions/task'
import * as selectors from 'selectors/task/browse'
import Dumb from 'components/task/add'

const reduxFormConfig = {
  form: 'taskAdd',
}

const Smart = reduxForm(reduxFormConfig)(Dumb)

function mapStateToProps(state) {
  return {
    data: selectors.data(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Smart)
