import httpClient from './axios';

const END_POINT = '/orders';

const getOpenOrdersList = () => httpClient.get(END_POINT);

/** 
 * 
 * @params {Object} data
 * 
 *
 * insert new order
*/
const insertNewOrder = (data) => httpClient.post(END_POINT, data);

export { getOpenOrdersList, insertNewOrder }