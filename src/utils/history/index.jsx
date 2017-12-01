import createBrowserHistory from 'history/createBrowserHistory'

export default createBrowserHistory({
  basename: '/console',
  forceRefresh: !('pushState' in window.history),
})
