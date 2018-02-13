import React from 'react'
import { i18n } from 'element-react'
import { AppContainer } from 'react-hot-loader'
import locale from 'element-react/src/locale/lang/ru-RU'
import App from 'containers/app'
import 'styles/index'

i18n.use(locale)

const Root = () => (
  <AppContainer>
    <App />
  </AppContainer>
)

export default Root
