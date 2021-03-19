import {computed, onMounted, nextTick, watch, Ref} from 'vue'

const useScheme = (mode: any | Ref<string> ) => {

  const scheme = computed(() => {
    return `sd--scheme--${mode.value ? mode.value : mode}`
  })
  
  watch(() => scheme.value, (newValue, oldValue) => {
    nextTick().then(() => {
      document.body.classList.remove(oldValue)
      document.body.classList.add(newValue)
    })
  })
  onMounted(() => {
    document.body.classList.remove('sd--scheme--dark', 'sd--scheme--light')
    document.body.classList.add(scheme.value)
  })
}
export default useScheme