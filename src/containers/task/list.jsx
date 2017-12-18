import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presentational from 'components/task/list'
import actions from 'actions/task'
// import { createSelector } from 'reselect'

function mapStateToProps(state) {
  return {
    list: state.tasks.list,
    columns: state.tasks.columns,
    data: state.tasks.columns,
    total: state.tasks.pageSize,
    pageSize: state.tasks.pageSize,
    currentPage: state.tasks.currentPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentational)
