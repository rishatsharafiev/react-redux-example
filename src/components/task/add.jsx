import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Card, Select } from 'element-react'
import Overlay from 'components/common/overlay'

const Page = ({
  data,
  isLoading,
}) => (
  <div>
    <h1>Задачи</h1>
    <div style={{ position: 'relative' }}>
      <Select value={this.state.value} filterable clearable>
        {
          this.state.options.map(el => <Select.Option key={el.value} label={el.label} value={el.value} />)
        }
      </Select>
      <Overlay isLoading={isLoading} />
    </div>
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

export default Page
