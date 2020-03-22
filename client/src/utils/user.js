import axios from './axiosWithAuth';
class User{
    async getCurrentUser(){
        const user = await axios.get('https://bohio.me/user')
        return user;
    }
}


export default new User()