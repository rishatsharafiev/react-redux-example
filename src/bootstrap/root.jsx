import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/configureStore'
import App from 'components/app'
import 'styles/index'

/* eslint-disable react/prop-types */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
/* eslint-enable react/prop-types */

const supportsHistory = 'pushState' in window.history

const Root = () => (
  <Provider store={store}>
    <Router basename='/' forceRefresh={!supportsHistory}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
)

export default Root
