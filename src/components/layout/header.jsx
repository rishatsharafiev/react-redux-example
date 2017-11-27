import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'element-react'

const Header = () => (
  <div>
    <Menu theme='dark' className='menu' mode='horizontal'>
      <Menu.Item index='1'>
        <Link to='/'>Main</Link>
      </Menu.Item>
      <Menu.Item index='2'>
        <Link to='/test2'>Test 2</Link>
      </Menu.Item>
      <Menu.Item index='3'>
        <Link to='/test3'>Test 3</Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default Header
