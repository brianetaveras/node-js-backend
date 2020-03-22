import axios from './axiosWithAuth';
class User{
    async getCurrentUser(){
        const user = await axios.get('http://localhost:4000/user')
        return user;
    }
}


export default new User()