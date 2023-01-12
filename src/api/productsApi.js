import axios from 'axios';

const productApi = axios.create({
	baseURL: 'http://localhost:3000/products',
});

export const getProducts = async () => await (await productApi.get('/')).data;

export const createProduct = async product => productApi.post('/', product);

export const deleteProduct = async id => productApi.delete(`/${id}`);

export const updateProduct = async product => productApi.put(`/${product.id}`, product);
