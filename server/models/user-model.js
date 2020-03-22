const db = require('../data/config');
const bcrypt = require('bcryptjs');

class UserModel{
    async getAllUsers(){
        const users = await db('users').select("uid", "name", "email", "created_at")
        return users;
    }

    async addUser(data){
        try{
            const hashedPass = await bcrypt.hash(data.password, 10)
            const newUser = await db('users').insert({
                name: data.name,
                password: hashedPass,
                email: data.email
            })
            console.log(newUser)
            return newUser
        } catch(err){
            throw err
        }
    }

    async getUserByEmail(email){
        try{
            const user = await db('users')
                        .select("*")
                        .where('email', email)
                        .first();

            return user
        } catch(err){
            return err
        }


    }

    async getUserById(id){
        try{    
            const user = await db('users')
                              .select('*')
                              .where("uid", id)
                              .first()
            return user;

        } catch(err){
            throw err
        }
    }
}



module.exports = new UserModel()