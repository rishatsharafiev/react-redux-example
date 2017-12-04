import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout } from 'element-react'
import routes from 'containers/routes'

const Container = ({ location }) => (
  <Layout.Row type='flex' justify='center'>
    <Layout.Col lg='20'>
      <div style={{ padding: '3rem' }}>
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
      </div>
    </Layout.Col>
  </Layout.Row>
)

Container.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Container
