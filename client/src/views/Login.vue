<template>
  <div class="login">
     <v-card class="login-card pa-10">
         <h2 class="text-center mb-5">Login</h2>
         <form @submit.prevent="login">
         <v-text-field v-model="user.email" type="text" label="email" outlined />
         <v-text-field v-model="user.password" type="password" label="password" outlined />
         <v-btn type="submit" block class="blue white--text">Log in</v-btn>
         <v-btn to="/signup" type="button" color="blue" outlined block class="mt-3">Sign up</v-btn>
         <div v-show="feedback" class="red--text text-center mt-3">{{feedback}}</div>

         </form>
     </v-card>
  </div>
</template>

<script>
import axios from '@/utils/axiosWithAuth.js'
export default {
  data(){
    return {
      user: {},
      feedback: null
    }
  },
  methods:{
    login(){
      axios.post('/auth/login', this.user).then(res=>{
        const token = res.data.token;
        localStorage.setItem('token', token);
        window.location.reload()
      }).catch((err)=>{
        this.feedback = err.response.data.message
      })
    }
  }

}
</script>

<style lang="scss">
.login-card{
    width: 100%;
    max-width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>