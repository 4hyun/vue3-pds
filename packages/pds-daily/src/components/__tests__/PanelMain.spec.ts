import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PanelMain from '../PanelMain.vue'

describe('PanelMain', () => {
  it('renders properly', () => {
    const wrapper = mount(PanelMain, { props: { title: 'PDS Journal' } })
    expect(wrapper.text()).toContain('PDS Journal')
  })
})
