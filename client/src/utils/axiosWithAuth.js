import axios from 'axios';
const token = localStorage.getItem('token')
const axiosWithAuth = axios.create({
    baseURL: 'https://bohio.me',
    headers:{
        Authentication: token
    }
})


export default axiosWithAuth;