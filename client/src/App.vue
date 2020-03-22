<template>
  <v-app>
    <Navbar/>
   <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import axios from 'axios'
export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    user: null
    //
  }),
  
};
</script>
