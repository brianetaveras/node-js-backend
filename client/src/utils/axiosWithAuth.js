import axios from 'axios';
const token = localStorage.getItem('token')
const axiosWithAuth = axios.create({
    headers:{
        Authentication: token
    }
})


export default axiosWithAuth;