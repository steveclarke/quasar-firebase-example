import Firebase from 'firebase/app'
import 'firebase/auth'

export default ({ app, router, Vue, store }) => {
  // Register the Firebase authentication listener
  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Signed in. Let Vuex know.
      store.commit('auth/SET_USER', user)
    } else {
      // Signed out. Let Vuex know.
      store.commit('auth/RESET_USER')
      router.replace({ name: 'signIn' }).catch(() => {})
    }
  })
}
