import React from 'react'
import { Button } from 'element-react'
import routerHistory from 'utils/history'

const Home = () => (
  <div>
    <h1>Главная</h1>
    <Button onClick={() => { routerHistory.push('/login') }}>Войти</Button>
    <Button onClick={() => { routerHistory.push('/register') }}>Регистрация</Button>
  </div>
)

export default Home
