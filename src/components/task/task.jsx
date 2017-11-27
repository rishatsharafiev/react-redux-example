import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import taskActions from 'actions/task'
import { Input } from 'element-react'

class Task extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.props.taskActions.setTaskName(value || '')
  }

  render() {
    const {
      task,
    } = this.props

    return (
      <div>
        <h1>Task</h1>
        <Input type='text' onChange={this.handleChange} />
        <p style={{ color: 'red' }}>{task.name}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    task: state.task,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
