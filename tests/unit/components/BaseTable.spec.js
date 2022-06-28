import { mount } from '@vue/test-utils';
import BaseTable from '@/components/base/BaseTable';

describe('BaseTable', () => {
      test("renders component", () => {
            const wrapper = mount(BaseTable);
            expect(wrapper.element).toMatchSnapshot()
      })
      test("variant has the initial value of scroll", () => {
            const wrapper = mount(BaseTable);
            expect(wrapper.vm.scrolled).toBe(false)
      })
      test('contains a table', () => {
            const wrapper = mount(BaseTable)
            expect(wrapper.find('table')).toBeTruthy()
      })
});
