import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Layout, Progress } from 'element-react'
import history from 'utils/history'
import store from 'store/configureStore'
import initialState from 'reducers/initialState'
import App from 'containers/app'
import 'styles/index'

/* eslint-disable react/prop-types */
class ScrollToTop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      progress: 0,
    }
  }
  componentDidMount() {
    this.progressInterval = setInterval(() => {
      if (this.state.progress >= 100) {
        clearInterval(this.progressInterval)
        this.setState({ loading: false })
      } else {
        this.setState({ progress: this.state.progress + 5 })
      }
    }, 120)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ marginTop: '15em' }}>
          <Layout.Row type='flex' className='row-bg' justify='center'>
            <Layout.Col span='2'>
              <Progress type='circle' percentage={this.state.progress} status={this.state.progress !== 100 ? '' : 'success'} />
            </Layout.Col>
          </Layout.Row>
        </div>
      )
    }
    return this.props.children
  }
}
/* eslint-enable react/prop-types */

const supportsHistory = 'pushState' in window.history

const Root = () => (
  <Provider store={store(initialState)}>
    <Router basename='/' forceRefresh={!supportsHistory} history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
)

export default Root
