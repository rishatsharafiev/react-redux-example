import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Card, Table, Pagination } from 'element-react'

const TaskList = ({
  columns,
  data,
  total,
  pageSize,
  currentPage,
}) => (
  <div>
    <Layout.Row type='flex' justify='center'>
      <Layout.Col lg='24'>
        <Card>
          <h1>Задачи</h1>

          <Table
            style={{ width: '100%' }}
            columns={columns}
            data={data}
            border
          />
          <div className='block'>
            <Pagination layout='prev, pager, next, jumper' total={total} pageSize={pageSize} currentPage={currentPage} />
          </div>
        </Card>
      </Layout.Col>
    </Layout.Row>
  </div>
)

TaskList.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default TaskList
