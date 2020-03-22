<template>
  <div class="signup">
    <v-card class="signup-card pa-10">
      <h2 class="text-center mb-5">Sign up</h2>
      <form @submit.prevent="signup">
        <v-text-field required v-model="user.name" type="text" label="name" outlined />
        <v-text-field required v-model="user.email" type="text" label="email" outlined />
        <v-text-field required v-model="user.password" type="password" label="password" outlined />
        <v-btn type="submit" block class="blue white--text">Sign up</v-btn>
        <div v-show="feedback" class="red--text text-center mt-3">{{feedback}}</div>
      </form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      feedback: null
    };
  },
  methods: {
    signup() {
      axios
        .post("http://localhost:4000/auth/signup", this.user)
        .then(res => {
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          this.feedback = err.response.data.message;
        });
    }
  }
};
</script>

<style lang="scss">
.signup-card {
  width: 100%;
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>