import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout, Card } from 'element-react'
import routes from 'containers/routes'

const Container = ({ location }) => (
  <div style={{ padding: '0.5rem' }}>
    <Layout.Row type='flex' justify='center'>
      <Layout.Col xs='24' sm='24' md='22' lg='14'>
        <Card bodyStyle={{ padding: '1.5em', minHeight: '500px' }}>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames='fade'
              timeout={300}
              appear
              enter
              exit={false}
              onEnter={() => {
                window.scrollTo(0, 0)
              }}
            >
              {routes}
            </CSSTransition>
          </TransitionGroup>
        </Card>
      </Layout.Col>
    </Layout.Row>
  </div>
)

Container.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Container
