
import { mount } from '@vue/test-utils';
import OrderBook from '@/views/OrderBook';

describe('OrderBook', () => {
      test("renders component", () => {
            const wrapper = mount(OrderBook);
            expect(wrapper.element).toMatchSnapshot()
      })

      test('should connect to Web Socket', () => {
            const wrapper = mount(OrderBook);
            wrapper.vm.startSocket();
            expect(wrapper.vm.connection).toBeTruthy();
      })
});
