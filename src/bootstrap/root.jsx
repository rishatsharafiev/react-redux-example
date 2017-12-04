import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Layout, Progress, i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/ru-RU'
import store from 'store/configureStore'
import initialState from 'reducers/initialState'
import App from 'containers/app'
import 'styles/index'

i18n.use(locale)

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

const Root = () => (
  <Provider store={store(initialState)}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Provider>
)

export default Root
