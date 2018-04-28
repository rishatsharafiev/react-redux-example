import React from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination, Icon, Button, Loading, Tag } from 'element-react'
import { Link } from 'react-router-dom'
import moment from 'utils/moment'
import routerHistory from 'utils/history'
import get from 'lodash/get'

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
    render(task) {
      const { id } = task
      const title = get(task, 'shop.title', 'Нет магазина')
      const href = `/tasks/${id}`

      return (
        <Link to={href}>{title}</Link>
      )
    },
  },
  {
    label: 'Статус',
    prop: 'status',
    width: 180,
    render(task) {
      const {
        status,
      } = task

      let content = <div />
      if (status === 0) {
        content = <Tag type='primary'>Отмена</Tag>
      } else if (status === 1) {
        content = <Tag type='gray'>Планируется</Tag>
      } else if (status === 2) {
        content = <Tag type='warning'>Идет проверка</Tag>
      } else if (status === 3) {
        content = <Tag type='danger'>Исправление замечаний</Tag>
      } else if (status === 4) {
        content = <Tag type='success'>Завершена</Tag>
      } else {
        content = <Tag>...</Tag>
      }

      return content
    },
  },
  {
    label: 'Адрес магазина',
    prop: 'shop.address',
    width: 300,
  },
  {
    label: 'Планируемая дата',
    prop: 'planned_at',
    width: 170,
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
    width: 170,
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
    label: 'Дата завершения',
    prop: 'finished_at',
    width: 170,
    render(task) {
      if (!task.finished_at) {
        return <span>Неизвестно</span>
      }

      return (
        <span>
          <Icon name='time' />
          <span style={{ marginLeft: '10px' }}>{moment(task.finished_at.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMMM YYYY')}</span>
        </span>
      )
    },
  },
  {
    label: 'Исполнитель',
    prop: 'executor',
    render(task) {
      const {
        executor,
      } = task

      return (
        <span>{executor ? executor.name : ''}</span>
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
      <Button style={{ position: 'absolute', bottom: '0px', right: '0px' }} type='primary' nativeType='button' onClick={() => { routerHistory.push('/tasks/add') }}><Icon name='document' /> Создать</Button>
    </div>
    {
      (isLoading)
        ? <Loading text='Загрузка данных...'><Table
          columns={columns}
          data={data}
          emptyText='Нет данных'
          align='left'
          height='150%'
          width='100%'
          resizable
          border
        /></Loading>
        : <Table
          columns={columns}
          data={data}
          emptyText='Нет данных'
          align='left'
          height='150%'
          width='100%'
          resizable
          border
        />
    }
    <Pagination
      layout='prev, pager, next, jumper'
      total={total || 10}
      perPage={perPage || 10}
      currentPage={currentPage}
      onCurrentChange={(item) => { handlePageChange(item) }}
    />
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
