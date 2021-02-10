export default (el, eventName, observerFn, options) => {
  function killObserver () {
    el.removeEventListener(eventName, observerFn)
  }

  eventName && eventName.indexOf('click') >= 0 && /iP/i.test(navigator.userAgent) && (el.style.cursor = 'pointer')

  el.addEventListener(eventName, observerFn, options || false)

  return {
    destroy: killObserver
  }
}
