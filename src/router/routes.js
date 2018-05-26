
export default [
  { // Auth Routes
    path: '/auth',
    redirect: 'auth/sign-in',
    component: () => import('layouts/auth'),
    children: [{
      path: 'sign-in',
      name: 'signIn',
      component: () => import('pages/auth/sign-in')
    }
    ]
  },

  { // Main Routes
    path: '/',
    component: () => import('layouts/default'),
    meta: { authRequired: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/index')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
