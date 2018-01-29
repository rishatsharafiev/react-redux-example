import React from 'react'
import { Provider } from 'react-redux'
import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/ru-RU'
import store from 'store/configureStore'
import initialState from 'reducers/initialState'
import App from 'containers/app'
import 'styles/index'

i18n.use(locale)

const Root = () => (
  <Provider store={store(initialState)}>
    <App />
  </Provider>
)

export default Root
