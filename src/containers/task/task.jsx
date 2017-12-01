import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Pagination, Table, Button } from 'element-react'
// import actions from 'actions/task'

class Task extends Component {
  // static propTypes = {
  //   actions: PropTypes.object.isRequired,
  // }

  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          label: 'Date',
          prop: 'date',
          width: 150,
          fixed: 'left',
        },
        {
          label: 'Name',
          prop: 'name',
          width: 200,
        },
        {
          label: 'State',
          prop: 'state',
          width: 200,
        },
        {
          label: 'City',
          prop: 'city',
          width: 200,
        },
        {
          label: 'Address',
          prop: 'address',
          width: 300,
        },
        {
          label: 'Operations',
          fixed: 'right',
          width: 150,
          render: () => <span><Button type='text' size='small'>Detail</Button><Button type='text' size='small'>Edit</Button></span>,
        },
      ],
      data: [{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }, {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
      }],
    }
  }

  render() {
    return (
      <div>
        <h1>Task</h1>

        <Table
          style={{ width: '100%' }}
          columns={this.state.columns}
          data={this.state.data}
          border
        />
        <div className='block'>
          <Pagination layout='prev, pager, next, jumper' total={1000} pageSize={100} currentPage={5} />
        </div>
      </div>
    )
  }
}

export default Task

/* function mapStateToProps(state) {
  return { ...state }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task) */
