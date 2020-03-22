<template>
  <div class="message-box">
      <form @submit.prevent="sendMessage">
      <v-text-field autocomplete="off" v-model="message" outlined placeholder="Type your message"></v-text-field>
      </form>
  </div>
</template>

<script>
import axiosWithAuth from '@/utils/axiosWithAuth.js'
export default {
data(){
    return {
        message: ''
    }
},
methods:{
    sendMessage(){
        axiosWithAuth.post('/messages', {message: this.message}).then(res=>{
            this.message = ''

        }
        )
    }
}
}
</script>

<style>

</style>