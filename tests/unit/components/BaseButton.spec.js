import { mount } from '@vue/test-utils';
import BaseButton from '@/components/base/BaseButton';

describe('BaseButton', () => {
      it("renders component", () => {
            const wrapper = mount(BaseButton, {propsData:{
                  variant: 'danger',
                  icon: 'angleRight',
                  title: 'test',
                  disabled: false
            }});
            expect(wrapper.element).toMatchSnapshot()
      })
      it("variant has initial variant of normal", () => {
            const wrapper = mount(BaseButton, {propsData:{
                  icon: 'angleRight',
                  title: 'test',
                  disabled: false
            }});
            expect(wrapper.vm.variant).toBe('normal')
      })
});
