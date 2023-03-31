import axios from 'axios';
import { baseUrl } from '../baseurl/baseurl';

export const addProductDetail = (data) => {
    return axios.post(`${baseUrl}/products/add`, data)
}

export const updateProductDetail = (id, data) => {
    return axios.put(`${baseUrl}/products/${id}`, data)
}

export const deleteProductDetail = (id) => {
    return axios.delete(`${baseUrl}/products/${id}`)
}