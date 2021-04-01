import { computed } from 'vue'

const useAlignment = (align: string, direction: string) => {
  const alignmentStyle = computed(() => {
    return {
      justifyContent: align,
      flexDirection: direction
    }
  })

  return { alignmentStyle }
}

export default useAlignment
