import { mount } from '@vue/test-utils';
import BaseSelect from '@/components/base/BaseSelect';

describe('BaseSelect', () => {
      test("renders component", () => {
            const wrapper = mount(BaseSelect);
            expect(wrapper.element).toMatchSnapshot()
      })

      test('setSelected demo', async () => {
            const wrapper = mount(BaseSelect, {propsData: {list: [10, 20, 30, 40]}})
            const options = wrapper.find('select').findAll('option')

            await options.at(1).setSelected()

            expect(wrapper.find('option:checked').element.value).toBe('10')
      })
});
