import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api_url = import.meta.env.VITE_API_URL
axios.defaults.baseURL = api_url;

/*
    axios.default.headers.common['Accept] = 'application/json';
    axios.default.headers.common['Content-Type] = 'application/json';
    axios.default.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.default.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    axios.default.headers.common['Authorization'] = AUTH_TOKEN;
*/

// `timeout` specifies the number of milliseconds before the request times out.
// If the request takes longer than `timeout`, the request will be aborted.

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const LoginFecth = () => axios.create({
    method: 'post',
    baseURL: api_url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 1000,

});

export const RegisterFetch = axios.create({
    baseURL: api_url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 1000,

});

export const ContactCreate = () => axios.create({
    method: 'post',
    url: '/contacts',
});

