import React from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination, Icon, Button } from 'element-react'
// import { Link } from 'react-router-dom'
import moment from 'utils/moment'
import Overlay from 'components/common/overlay'
import routerHistory from 'utils/history'

const columns = [
  {
    label: '№',
    prop: 'id',
    width: 60,
  },
  {
    label: 'Правка',
    prop: 'actions',
    width: 90,
    render(task) {
      const { id } = task
      const href = `/tasks/${id}`

      return (
        <Button plain type='success' size='small' nativeType='button' onClick={() => { routerHistory.push(href) }}><Icon name='edit' /></Button>
      )
    },
  },
  {
    label: 'Название магазина',
    prop: 'shop.title',
    width: 220,
  },
  {
    label: 'Статус',
    prop: 'status',
    width: 120,
    render(task) {
      const {
        status,
      } = task

      let statusName = ''
      if (status === 1) {
        statusName = 'Планируется'
      }

      return (
        <span>{statusName}</span>
      )
    },
  },
  {
    label: 'Адрес магазина',
    prop: 'shop.address',
    width: 220,
  },
  {
    label: 'Планируемая дата',
    prop: 'planned_at',
    width: 160,
    render(task) {
      if (!task.planned_at) {
        return <span>Скоро</span>
      }

      return (
        <span>
          <Icon name='time' />
          <span style={{ marginLeft: '10px' }}>{moment(task.planned_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')}</span>
        </span>
      )
    },
  },
  {
    label: 'Дата начала',
    prop: 'started_at',
    width: 150,
    render(task) {
      if (!task.started_at) {
        return <span>Неизвестно</span>
      }

      return (
        <span>
          <Icon name='time' />
          <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')}</span>
        </span>
      )
    },
  },
  {
    label: 'Дата окончания',
    prop: 'started_at',
    width: 150,
    render(task) {
      if (!task.started_at) {
        return <span>Неизвестно</span>
      }

      return (
        <span>
          <Icon name='time' />
          <span style={{ marginLeft: '10px' }}>{moment(task.started_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')}</span>
        </span>
      )
    },
  },
  {
    label: 'Исполнитель',
    prop: 'executor',
    render(task) {
      const {
        executor: {
          name,
        },
      } = task

      return (
        <span>{name}</span>
      )
    },
  },
]

const Dumb = ({
  data,
  total,
  perPage,
  currentPage,
  handlePageChange,
  isLoading,
}) => (
  <div>
    <div style={{ position: 'relative' }}>
      <h1>Заявки</h1>
      <Button style={{ position: 'absolute', bottom: '0px', right: '0px' }} type='primary' nativeType='button' onClick={() => { routerHistory.push('/tasks/add') }}><Icon name='document' /> Создать заявку</Button>
    </div>
    <div style={{ position: 'relative' }}>
      <Table
        columns={columns}
        data={data}
        emptyText='Нет данных'
        align='left'
        height='150%'
        width='100%'
        resizable
        border
      />
      <Overlay isLoading={isLoading} />
    </div>
    <div className='block'>
      <Pagination
        layout='prev, pager, next, jumper'
        total={total || 10}
        perPage={perPage || 10}
        currentPage={currentPage}
        onCurrentChange={(item) => { handlePageChange(item) }}
      />
    </div>
  </div>
)

Dumb.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
}

Dumb.defaultProps = {
  total: 1,
  perPage: 1,
  currentPage: 1,
  isLoading: false,
}

export default Dumb
