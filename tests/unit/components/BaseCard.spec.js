import { mount } from '@vue/test-utils';
import BaseCard from '@/components/base/BaseCard';

describe('BaseCard', () => {
      test("renders component", () => {
            const wrapper = mount(BaseCard);
            expect(wrapper.element).toMatchSnapshot()
      })

      test("title has the inital value of ''", () => {
            const wrapper = mount(BaseCard);
            expect(wrapper.vm.title).toEqual('')
      })

      test("has title class if title passed", () => {
            const wrapper = mount(BaseCard, {propsData: {title: 'title'}});
            expect(wrapper.find(".title")).toBeTruthy();
      })
});
