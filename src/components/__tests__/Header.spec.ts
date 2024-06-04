import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Header)

    const header = wrapper.find('.header')
    expect(header.exists()).toBe(true)

    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
    expect(form.attributes('class')).toContain('header__block')

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('search')
    expect(input.attributes('placeholder')).toBe('Search for country')

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Search')

    expect(wrapper.find('.header__error').exists()).toBe(false)
  })

  it('emits search event on valid submit', async () => {
    const wrapper = shallowMount(Header)

    const input = wrapper.find('input')
    await input.setValue('London')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.emitted('search')).toEqual([['London']])
  })

  it('shows validation error on empty input submit', async () => {
    const wrapper = shallowMount(Header)

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.find('.header__error').exists()).toBe(true)
    expect(wrapper.find('.header__error').text()).toBe('The field must not be empty')
  })

  it('shows validation error on invalid city name submit', async () => {
    const wrapper = shallowMount(Header)

    const input = wrapper.find('input')
    await input.setValue('London123')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.find('.header__error').exists()).toBe(true)
    expect(wrapper.find('.header__error').text()).toBe('Please enter a valid city name in English.')
  })
});
