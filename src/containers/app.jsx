import React from 'react'
import { Router } from 'react-router-dom'
import routerHistory from 'utils/history'
import 'element-theme-default'
import Header from 'containers/layout/header'
import Main from 'containers/layout/main'

const App = () => (
  <Router history={routerHistory}>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
)

export default App
