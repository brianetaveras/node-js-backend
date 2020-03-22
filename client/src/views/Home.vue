<template>
  <div class="home">
   <v-card class="pa-5 home-card">
     <h1 v-if="user" class="text-center">Welcome home, {{user.name}}</h1>
     <h1 v-else class="text-center">Loading...</h1>
     <h2 v-show="result">{{result}}</h2>
     <v-btn @click="logout" depressed class="red white--text" block>Log out</v-btn>
   </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import socketIOClient from "socket.io-client";
import userModel from '@/utils/user.js';
export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      user: null,
      endpoint: 'http://localhost:4000',
      result: null
    }
  },
  created(){
    this.user = userModel.getCurrentUser().then(res=>{
      this.user = res.data
    }).catch(err=>{
      console.log(err)
    })
  },
  mounted(){
     const socket = socketIOClient(this.endpoint);
    socket.on("FromAPI", data => this.result = data);
  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  .home-card{
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 600px;
    }
}
</style>