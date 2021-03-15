import { computed } from 'vue'

const useAlignment = (align: string, direction: string) => {
  const alignmentStyle = computed(() => {
    return {
      'justify-content': align,
      'flex-direction': direction
    }
  })

  return { alignmentStyle }
}

export default useAlignment
