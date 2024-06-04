import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CityInfo from '@/components/CityInfo.vue'

describe('CityInfo', () => {
  it('renders weather information correctly', () => {
    const mockInfo = {
      iconSrc: 'https://example.com/weather.png',
      iconDescription: 'Sunny',
      currentTemp: '25',
      feelsLikeTemp: '23',
    }

    const wrapper = mount(CityInfo, {
      props: { info: mockInfo },
    })

    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(mockInfo.iconSrc)
    expect(image.attributes('alt')).toBe(mockInfo.iconDescription)

    const expectedText = `Temperature: ${ mockInfo.currentTemp } °C (Feels like: ${ mockInfo.feelsLikeTemp } °C)`
    expect(wrapper.text()).toContain(expectedText)
  })
})
