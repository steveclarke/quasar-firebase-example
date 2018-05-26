<template>
  <q-page class="flex flex-center">

    <q-card
      class="card-sign-in q-pa-md"
      inline
      color="white"
    >
      <q-card-media
        class="q-pa-md"
      >
        <img src="" />
      </q-card-media>

      <q-card-title
        class="text-dark text-center"
      >
        Sign in to your account
      </q-card-title>

      <form @submit.prevent="signIn()">
        <q-card-main>
          <q-field
            icon="email"
            icon-color="light"
            class="q-mt-md"
          >
            <q-input
              placeholder="Email Address"
              v-model="form.email"
              type="email"
              autocomplete="username"
            />
          </q-field>

          <q-field
            icon="lock"
            icon-color="light"
            class="q-mt-lg"
          >
            <q-input
              placeholder="Password"
              v-model="form.password"
              type="password"
              autocomplete="current-password"
            />
          </q-field>
        </q-card-main>

        <q-card-actions
          align="center"
          class="q-mt-lg"
        >
          <q-btn
            label="Sign In"
            color="primary"
            size="large"
            type="submit"
          />
        </q-card-actions>
      </form>

    </q-card>

  </q-page>
</template>

<script>
export default {
  name: 'PageSignIn',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      let credentials = {
        email: this.form.email,
        password: this.form.password
      }

      this.$store.dispatch('auth/signIn', credentials)
        .then(user => {
          this.$router.replace({ name: 'dashboard' })
        })
        .catch(error => {
          this.$q.notify('Invalid Login!')
          console.error(`Not signed in: ${error.message}`)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card-sign-in
    width 80%
</style>
