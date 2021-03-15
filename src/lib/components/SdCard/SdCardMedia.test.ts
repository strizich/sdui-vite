import { shallowMount } from '@vue/test-utils'
import SdCardMedia from './SdCardMedia.vue'

describe('SdCardMedia', () => {
  it('get the aspect ratio', () => {
    const wrapper = shallowMount(SdCardMedia, {
      propsData: {
        ratio: '16/9'
      }
    })
    const expected = ['16', '9']
    expect(wrapper.vm.getAspectRatio).toEqual(expected)
  })
  it('renders media class when passed', () => {
    const wrapper = shallowMount(SdCardMedia, {
      propsData: {
        ratio: '16-9'
      }
    })
    const expected = 'sd--card__media--16-9'
    expect(wrapper.vm.mediaClasses).toEqual(expected)

    wrapper.setProps({ ratio: '16x9' })
    expect(wrapper.vm.mediaClasses).toEqual(expected)

    wrapper.setProps({ ratio: '16/9' })
    expect(wrapper.vm.mediaClasses).toEqual(expected)

    wrapper.setProps({
      ratio: '16:9'
    })
    expect(wrapper.vm.mediaClasses).toEqual(expected)
  })
  it('renders media size when passed', () => {
    const wrapper = shallowMount(SdCardMedia, {
      propsData: {
        ratio: '16-9',
        size: 'sm'
      }
    })
    const expected = 'sd--card__media--sm'

    expect(wrapper.vm.mediaSize).toEqual(expected)
    console.log(wrapper)
  })
})
