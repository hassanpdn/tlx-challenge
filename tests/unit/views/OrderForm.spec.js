

import { mount } from '@vue/test-utils';
import OrderForm from '@/views/OrderForm';


describe('Order Form', () => {
      test("renders component", () => {
            const wrapper = mount(OrderForm);
            expect(wrapper.element).toMatchSnapshot()
      })

      test('should set order', () => {
            const wrapper = mount(OrderForm);
            wrapper.vm.setOrder({price: 20, amount: 2000, side: 'buy'})
            expect(wrapper.vm.order.price).toEqual(20)
      })
      
});
