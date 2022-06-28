import { mount } from '@vue/test-utils';
import BaseNumberControlInput from '@/components/base/BaseNumberControlInput';

describe('BaseNumberControlInput', () => {
      it("renders component", () => {
            const wrapper = mount(BaseNumberControlInput, {propsData: {icon: 'angleRight', value: 10}});
            expect(wrapper.element).toMatchSnapshot()
      })

      test('contains a input', () => {
            const wrapper = mount(BaseNumberControlInput, {propsData: {icon: 'angleRight', value: 10}})
            expect(wrapper.find('input')).toBeTruthy()
      })

      test('increment', () => {
            const wrapper = mount(BaseNumberControlInput, {propsData: {icon: 'angleRight', value: 0, step: 5}})
            wrapper.vm.increment()
            expect(wrapper.vm.currentValue).toEqual(5)
      })

      test('decrement', () => {
            const wrapper = mount(BaseNumberControlInput, {propsData: {icon: 'angleRight', value: 0, step: 5, min:-5}})
            wrapper.vm.decrement()
            expect(wrapper.vm.currentValue).toEqual(-5)
      })
});
