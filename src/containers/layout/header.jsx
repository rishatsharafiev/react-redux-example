import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'element-react'

const Header = () => (
  <div>
    <Menu theme='dark' className='menu' mode='horizontal'>
      <Menu.Item index='1'>
        <Link to='/'>Главная</Link>
      </Menu.Item>
      <Menu.Item index='2'>
        <Link to='/task'>Задачи</Link>
      </Menu.Item>
      <Menu.Item index='3'>
        <Link to='/login'>Войти</Link>
      </Menu.Item>
      <Menu.Item index='4'>
        <Link to='/register'>Регистрация</Link>
      </Menu.Item>
    </Menu>
  </div>
)

export default Header
