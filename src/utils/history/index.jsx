import createBrowserHistory from 'history/createBrowserHistory'
import config from 'utils/config'

export default createBrowserHistory({
  basename: config.basename,
  forceRefresh: !('pushState' in window.history),
})
