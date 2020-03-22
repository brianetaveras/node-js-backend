import axios from './axiosWithAuth';
class User{
    async getCurrentUser(){
        const user = await axios.get('/user')
        return user;
    }
}


export default new User()