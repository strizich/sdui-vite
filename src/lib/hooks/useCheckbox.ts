import { ComputedRef, ref, computed} from 'vue'

const useCheckbox = (props, emit) => {
  const checkboxRef = ref(null)

  const hasValue: ComputedRef<boolean> = computed(() => {
    return props.value !== null
  })

  const isModelArray: ComputedRef<boolean> = computed(() => {
    return Array.isArray(props.modelValue)
  })

  const isSelected: ComputedRef<boolean> = computed(() => {
    if (isModelArray.value) {
      return props.modelValue.includes(props.value)
    }
    if (hasValue.value) {
      return props.modelValue === props.value
    } else {
      return props.modelValue === props.trueValue
    }
  })

  const removeItemFromModel = (newModel) => {
    const index = newModel.indexOf(props.value)
    if (index !== -1) {
      newModel.splice(index, 1)
    }
  }

  const handleArrayCheckbox = () => {
    let newModel = props.modelValue
    if (!isSelected.value) {
      newModel.push(props.value)
    } else {
      removeItemFromModel(newModel)
    }
    emit('update:modelValue', newModel)
  }

  const handleSingleSelectCheckbox = () => {
    emit('update:modelValue', isSelected.value ? null : props.value)
  }

  const handleSimpleCheckbox = () => {
    emit('update:modelValue', isSelected.value ? props.falseValue : props.trueValue)
    console.log(props.falseValue, props.trueValue)
  }

  const handleChecked = () => {
    if (!props.disabled) {
      if (isModelArray.value) {
        handleArrayCheckbox()
      } else if (hasValue.value) {
        handleSingleSelectCheckbox()
      } else {
        handleSimpleCheckbox()
      }
    }
  }
  return {
    checkboxRef,
    isSelected,
    isModelArray,
    hasValue,
    handleChecked
  }
}

export default useCheckbox
