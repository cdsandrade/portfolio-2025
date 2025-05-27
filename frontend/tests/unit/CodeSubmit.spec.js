import { mount } from '@vue/test-utils'
import CodeSubmit from '../../src/components/CodeSubmit.vue'

test('renders input and submit button', () => {
  const wrapper = mount(CodeSubmit)
  expect(wrapper.text()).toMatch(/Submit/)
})

test('submits input and shows mocked response', async () => {
  const wrapper = mount(CodeSubmit)

  // Simulate user typing
  await wrapper.find('textarea').setValue('test input')

  // Simulate button click
  // await wrapper.find('button').trigger('click')
  await wrapper.find('button[type="submit"]').trigger('submit')

  // Wait for DOM update (simplistic, can refine with flushPromises)
  await new Promise(resolve => setTimeout(resolve, 100))

  // // Assert response output
  // expect(wrapper.text()).toContain('Mocked response')

  const preEls = wrapper.findAll('pre')

  expect(preEls).toHaveLength(2)
  expect(preEls[0].text()).toContain('result')     // Full JSON object
  expect(preEls[1].text()).toBe('Mocked response') // Just result
})
