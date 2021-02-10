import { shallowMount } from '@vue/test-utils'
import SdCard from './SdCard.vue'

describe('SdCard', () => {
  it('renders elevation class when passed', () => {
    const wrapper = shallowMount(SdCard, {
      propsData: {
        elevation: 7
      }
    })
    const expected = {
      'elevation--7': true,
      'is--clickable': false
    }

    expect(wrapper.vm.classes).toStrictEqual(expected)
  })
})
