<template>
  <div class="user-card">
      <v-card class="my-2 pa-3">
          name: {{user.name}}
      </v-card>
  </div>
</template>

<script>
export default {
props: ['user']
}
</script>

<style>

</style>