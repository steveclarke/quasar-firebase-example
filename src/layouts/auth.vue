<template>
  <q-layout>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutAuth',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
  .q-layout
    background url('~assets/auth-background.jpg') no-repeat center center fixed
    background-size cover
</style>
