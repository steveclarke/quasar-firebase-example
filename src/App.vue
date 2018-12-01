<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'App',

  preFetch (context) {
    console.log('I am pre-fetching!', context)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        context.store.commit('auth/SET_USER', user)
        context.redirect('/')
      } else {
        context.store.commit('auth/RESET_USER')
        context.redirect('/auth/sign-in')
      }
    })
  }
}
</script>

<style>
</style>
