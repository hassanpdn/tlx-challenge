import { mount } from '@vue/test-utils';
import BaseTable from '@/components/base/BaseTable';

describe('BaseTable', () => {
      test("renders component", () => {
            const wrapper = mount(BaseTable);
            expect(wrapper.element).toMatchSnapshot()
      })
      test('contains a table', () => {
            const wrapper = mount(BaseTable)
            expect(wrapper.find('table')).toBeTruthy()
      })
});
