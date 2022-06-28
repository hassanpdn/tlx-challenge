import { mount } from '@vue/test-utils';
import BaseIcon from '@/components/base/BaseIcon';

describe('BaseIcon', () => {
      it("renders component", () => {
            const wrapper = mount(BaseIcon, {propsData: {icon : 'angleRight'}});
            expect(wrapper.element).toMatchSnapshot()
      })
      it("place has initail value of input", () => {
            const wrapper = mount(BaseIcon, {propsData: {icon : 'angleRight'}});
            expect(wrapper.vm.place).toBe('input')
      })
});
