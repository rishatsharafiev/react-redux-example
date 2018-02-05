import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Card, Table, Pagination, Icon } from 'element-react'
import moment from 'utils/moment'

const columns = [
  {
    label: 'Постановщик задачи',
    prop: 'author',
    width: 250,
  },
  {
    label: 'Дата начала',
    prop: 'started_at',
    width: 250,
    render(data) {
      let started_at = ''
      if (data.started_at) {
        started_at = moment(data.started_at.date, 'YYYY-MM-DD HH:mm:ss.SSSSSS').format('DD MMMM YYYY')
      }

      return (
        <span>
          <Icon name='time' />
          <span style={{ marginLeft: '10px' }}>{started_at}</span>
        </span>
      )
    },
  },
  {
    label: 'Адрес магазина',
    prop: 'shop.address',
  },
]

const overlayStyles = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor:
  '#fff',
  opacity: 0.7,
}

const TaskList = ({
  data,
  total,
  pageSize,
  currentPage,
  handleCurrentChange,
  isLoading,
}) => (
  <div>
    <Layout.Row type='flex' justify='center'>
      <Layout.Col lg='24'>
        <Card>
          <h1>Задачи</h1>
          <div style={{ position: 'relative' }}>
            <Table
              style={{ width: '100%' }}
              columns={columns}
              data={data}
              emptyText='Нет данных'
              align='left'
              height='441px'
              resizable
              border
            />
            <div style={{ ...overlayStyles, display: isLoading ? 'block' : 'none' }}>
              <Icon name='loading' style={{ left: '50%', top: '50%', position: 'relative' }} />
            </div>
          </div>
          <div className='block'>
            <Pagination
              layout='prev, pager, next, jumper'
              total={total || 10}
              pageSize={pageSize || 10}
              currentPage={currentPage}
              onCurrentChange={(item) => { handleCurrentChange(item) }}
            />
          </div>
        </Card>
      </Layout.Col>
    </Layout.Row>
  </div>
)

TaskList.propTypes = {
  handleCurrentChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
}

TaskList.defaultProps = {
  total: 1,
  pageSize: 1,
  currentPage: 1,
  isLoading: false,
}

export default TaskList
