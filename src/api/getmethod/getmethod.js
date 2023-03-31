import axios from 'axios';
import { baseUrl } from '../baseurl/baseurl';

export const getAllProducts = () => {
    return axios.get(`${baseUrl}/products`)
}

export const getAllCategory = () => {
    return axios.get(`${baseUrl}/products/categories`)
}