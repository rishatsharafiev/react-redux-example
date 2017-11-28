import React from 'react'
import { Layout } from 'element-react'
import Routes from 'containers/layout/routes'

const Main = () => (
  <div>
    <Layout.Row gutter='20'>
      <Layout.Col offset='3' span='15'>
        {Routes}
      </Layout.Col>
    </Layout.Row>
  </div>
)

export default Main
