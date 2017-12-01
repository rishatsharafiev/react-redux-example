const CONFIG = window.CONFIG ? {
  ...window.CONFIG,
  basename: window.CONFIG.basename ? window.CONFIG.basename : '',
  api: window.CONFIG.api ? window.CONFIG.api : '',
  cdn: window.CONFIG.cdn ? window.CONFIG.cdn : '',
} : {}

export default CONFIG
