import axios from '../plugins/axios';
export const getCart = () => axios.get('/kaola/cart');
