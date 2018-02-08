import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'element-react'
import Permission from 'utils/auth/permission'

const allowedRoles = ['100']

const Header = () => (
  <div>
    <Menu theme='dark' className='menu' mode='horizontal'>
      <Menu.Item index='main'>
        <Link to='/'>Главная</Link>
      </Menu.Item>
      <Permission allowedRoles={allowedRoles}>
        <Menu.Item index='tasks'>
          <Link to='/tasks'>Задачи</Link>
        </Menu.Item>
      </Permission>
      <Permission loggedIn={false}>
        <Menu.Item index='login'>
          <Link to='/login'>Войти</Link>
        </Menu.Item>
        <Menu.Item index='register'>
          <Link to='/register'>Регистрация</Link>
        </Menu.Item>
      </Permission>
      <Permission allowedRoles={allowedRoles}>
        <Menu.Item index='logout'>
          <Link to='/logout'>Выход</Link>
        </Menu.Item>
      </Permission>
    </Menu>
  </div>
)

export default Header
