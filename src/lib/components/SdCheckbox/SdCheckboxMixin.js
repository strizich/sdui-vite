// import SdFocused from '../../core/mixins/SdFocused'
// Rework this mixin to use the new v-modal pattern.
export default {
  data () {
    return {
      hasFocus: false
    }
  },
  props: {
    modelValue: [String, Boolean, Object, Number, Array],
    value: {
      type: [String, Boolean, Object, Number],
      default: null
    },
    name: [String, Number],
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    fieldType: {
      type: String,
      default: 'sd--checkbox'
    }
  },
  emits: ['update:modelValue'],
  computed: {
    attributes: function () {
      const attrs = {
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        'true-value': this.trueValue,
        'false-value': this.falseValue
      }
      if (this.value === null || typeof this.value !== 'object') {
        attrs.value = (this.value === null || this.value === undefined) ? '' : String(this.value)
      }
      return attrs
    },
    isSelected: function () {
      if (this.isModelArray) {
        return this.modelValue.includes(this.value)
      }
      if (this.hasValue) {
        return this.modelValue === this.value
      }
      return this.modelValue === this.trueValue
    },
    isModelArray: function () {
      return Array.isArray(this.modelValue)
    },
    checkClasses: function () {
      return {
        'is--checked': this.isSelected,
        'is--disabled': this.disabled,
        'is--required': this.required,
        'is--indeterminate': this.indeterminate
      }
    },
    hasValue: function () {
      return !!this.$props.value
    }
  },
  methods: {
    removeItemFromModel: function (newModel) {
      const index = newModel.indexOf(this.value)
      if (index !== -1) {
        newModel.splice(index, 1)
      }
    },
    handleArrayCheckbox: function () {
      const newModel = this.modelValue
      if (!this.isSelected) {
        newModel.push(this.value)
      } else {
        this.removeItemFromModel(newModel)
      }
      this.$emit('update:modelValue', newModel)
    },
    handleSingleSelectCheckbox: function () {
      this.$emit('update:modelValue', this.isSelected ? null : this.value)
    },
    handleSimpleCheckbox: function () {
      this.$emit('update:modelValue', this.isSelected ? this.falseValue : this.trueValue)
    },
    toggleCheck () {
      if (!this.disabled) {
        this.hasFocus = false
        if (this.isModelArray) {
          this.handleArrayCheckbox()
        } else if (this.hasValue) {
          this.handleSingleSelectCheckbox()
        } else {
          this.handleSimpleCheckbox()
        }
      }
    },
    onFocus () {
      this.hasFocus = true
    },
    onBlur () {
      this.hasFocus = false
    }
  }
}
