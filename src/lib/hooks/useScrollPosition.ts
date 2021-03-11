import { ref, onMounted, onUnmounted } from 'vue'

const useScrollPosition = () => {
  const showHeader = ref(true)
  const last = ref(0)
  const current = ref(0)

  const onScroll = () => {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop
    const scrollingDown = currentPosition < last.value
    if (currentPosition < 50) {
      showHeader.value = true
    } else {
      showHeader.value = scrollingDown
      last.value = currentPosition
    }
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { showHeader, last, current }
}

export default useScrollPosition
