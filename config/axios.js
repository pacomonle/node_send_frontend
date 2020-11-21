import axios from 'axios';
// crear instacia de axios
const clienteAxios = axios.create({
    baseURL: process.env.backendURL
});

export default clienteAxios;