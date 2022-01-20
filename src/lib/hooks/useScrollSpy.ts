// prettier-ignore no-console
// eslint-ignore no-console

import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import SdThrottle from '../core/utilities/SdThrottle';

const useScrollSpy = (element, target) => {
  const parentEl = ref(element);
  const bodyEl = ref(target);
  const scrollPosition = ref(0)
  const activeSection = ref('');

  const handleScroll = () => {
    nextTick().then(() => {
      scrollPosition.value = window.scrollY
      activeSection.value = getSectionPosition()
    })
  }

  const getSectionPosition = () => {
    if (parentEl.value && bodyEl.value) {
      const sections = bodyEl.value.children
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const nextSection = sections[i + 1]
        const lastSection = sections[sections.length - 1]
        const lastActiveSection = scrollPosition.value >= lastSection?.offsetTop
        const activeSection = scrollPosition.value >= section?.offsetTop
          && (nextSection?.offsetTop > scrollPosition.value)
        if (activeSection) {
          return section?.id
        }
        if (lastActiveSection) {
        }
          return lastSection?.id
      }
    }
  }
  onMounted(() => {
    activeSection.value = getSectionPosition()
    window.addEventListener('scroll', SdThrottle(60, handleScroll), true)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { activeSection }
}

export default useScrollSpy