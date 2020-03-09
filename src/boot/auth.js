export default ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // Check to see if the route has the meta field "authRequired" set to true
    let authRequired = to.matched.some(route => route.meta.authRequired)

    let isAuthenticated = store.state.auth.user !== null

    if (authRequired) {
      if (isAuthenticated) {
        // User is already signed in. Continue on.
        setTimeout(() => {
          next()
        }, 200)
      } else {
        // Not signed in. Redirect to login page.
        next({
          name: 'signIn'
        })
      }
    } else {
      // Prevent access signIn page, when user is authenticated
      if (isAuthenticated && (to.name === 'signIn')) {
        next({
          name: 'dashboard'
        })
      }

      // Doesn't require authentication. Just continue on.
      next()
    }
  })
}
