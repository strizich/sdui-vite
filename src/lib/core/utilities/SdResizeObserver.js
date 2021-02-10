import raf from 'raf'
import SdObserveEvent from './SdObserveEvent'

export default (el = window, observerFn) => {
  const observer = SdObserveEvent(el, 'resize', () => {
    raf(observerFn)
  }, { passive: true })

  return {
    destroy: observer.destroy
  }
}
