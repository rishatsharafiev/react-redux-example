import React from 'react'
import { Router, Route } from 'react-router-dom'
import 'element-theme-default'
import routerHistory from 'utils/history'
import Main from 'containers/layout/main'
import Header from 'containers/layout/header'
import Container from 'containers/layout/container'

const App = () => (
  <Main>
    <Router history={routerHistory}>
      <Route render={({ location }) => (
        <div>
          <Header />
          <Container location={location} />
        </div>
      )}
      />
    </Router>
  </Main>
)

export default App
