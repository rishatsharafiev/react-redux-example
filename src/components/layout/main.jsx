import React from 'react'
import Routes from 'components/layout/routes'
import { Layout } from 'element-react'

const Main = () => (
  <div>
    <Layout.Row gutter='20'>
      <Layout.Col offset='3' span='15'>
        <h1>Main</h1>
        {Routes}
      </Layout.Col>
    </Layout.Row>
  </div>
)

export default Main
