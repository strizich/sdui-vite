import {computed, onMounted, nextTick, watch, Ref} from 'vue'

const useScheme = (mode: Ref<string>) => {
  const scheme = computed(() => {
    return `sd--scheme--${mode.value}`
  })
  
  watch(() => scheme.value, (newValue, oldValue) => {
    nextTick().then(() => {
      document.body.classList.replace(`${oldValue}`, `${newValue}`)
    })
  })
  onMounted(() => {
    document.body.classList.add(`${scheme.value}`)
  })
}
export default useScheme