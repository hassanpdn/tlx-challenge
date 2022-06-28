import { mount } from '@vue/test-utils';
import BaseToast from '@/components/base/BaseToast';

describe('BaseToast', () => {
      test("renders component", () => {
            const wrapper = mount(BaseToast);
            expect(wrapper.element).toMatchSnapshot()
      })

      test('addToast', () => {
            const wrapper = mount(BaseToast)
            wrapper.vm.addToast({state: 'danger', message: 'is-test', time: '3500'})
            expect(wrapper.vm.toasts).toHaveLength(1)
      })
});
