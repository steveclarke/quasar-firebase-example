import Firebase from 'firebase/app'
import 'firebase/auth'

export default ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    let authRequired = to.matched.some(route => route.meta.authRequired)

    let isAuthenticated = Firebase.auth().currentUser !== null

    if (authRequired) {
      if (isAuthenticated) {
        // User is already signed in. Continue on.
        next()
      } else {
        // Not signed in. Redirect to login page.
        next({
          name: 'signIn'
        })
      }
    } else {
      // Doesn't require authentication. Just continue on.
      next()
    }
  })
}
