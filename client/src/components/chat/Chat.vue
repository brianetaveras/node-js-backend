<template>
  <div class="chat">
      <div class="chat-content" v-chat-scroll="{always: false, smooth: true}">
          <transition v-for="(m, index) in messages" :key="index" enter-active-class="animated fadeInDown">
          <div class="chat-bubble cyan lighten-5 px-5 py-5 my-2">
              <div class="name light-blue--text darken-4 font-weight-bold">{{m.name}}</div>
              <div class="content py-3">{{m.message}}</div>
          </div>

          </transition>

      </div>
      <v-spacer/>
      <MessageBox />
  </div>
</template>

<script>
import MessageBox from '@/components/chat/MessageBox.vue';
export default {
    props: ['messages'],
    components:{
        MessageBox
    }
}
</script>

<style scoped lang="scss">

.chat-content{
    width: 100%;
    height: 80%;
    max-height: 500px;
    overflow: scroll;

    &::-webkit-scrollbar {
  width: 5px;
}
 
&::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
 
&::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}


    .chat-bubble{
        border-radius: 15px;
        position: relative;

        .name{
            position: absolute;
            top: 5px;
            left: 20px;

        }
    }

}
</style>