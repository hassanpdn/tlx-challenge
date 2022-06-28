
import { mount } from '@vue/test-utils';
import OrderBook from '@/views/OrderBook';

describe('OrderBook', () => {
      test("renders component", () => {
            const wrapper = mount(OrderBook);
            expect(wrapper.element).toMatchSnapshot()
      })

      test('averageCalculation', () => {
            const data = {'insert':[{price: 20, amount: 26.181920, side: 'buy'}, {price: 80, amount: 26.181920, side: 'sell'}, {price: 15, amount: 26.181920, side: 'sell'}, {price: 30, amount: 26.181920, side: 'buy'}]};
            const wrapper = mount(OrderBook);
            wrapper.setData({items: data})
            wrapper.vm.averageCalculation();
            expect(wrapper.vm.currentMarkPrice).toEqual(22.5);
      })
});
