<template>
  <div class="home">
   <v-card class="pa-5 home-card">
     <v-btn class="red white--text" @click="logout">Log Out</v-btn>
     <Chat class="mt-10" :messages="result"/>
   </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/User.vue'
import socketIOClient from "socket.io-client";
import userModel from '@/utils/user.js';
import Chat from '@/components/chat/Chat.vue'
import axiosWithAuth from '@/utils/axiosWithAuth.js'
export default {
  name: 'Home',
  components: {
    Chat,

  },
  data(){
    return {
      user: null,
      endpoint: 'bohio.me',
      result: []
    }
  },
  created(){
    this.user = userModel.getCurrentUser().then(res=>{
      this.user = res.data
    }).catch(err=>{
      console.log(err)
    })

    axiosWithAuth.get('/messages').then(res=>{
      this.result = res.data
    })

    
  },
  mounted(){
     const socket = socketIOClient(this.endpoint);
    socket.on("chat message", data => {
      this.result = [...this.result, data]
    })
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
    height: 100%;
    max-height: 100vh;
    max-width: 600px;
    
    }
}
</style>