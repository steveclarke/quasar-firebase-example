<template>
  <q-page padding>

    <div v-if="loading">
      <q-spinner /> Fetching data...
    </div>

    <div v-else>
      <q-list>
        <q-list-header>Todos</q-list-header>
        <q-item
          v-for="(todo, index) in todos"
          :key="index"
        >
          <q-item-main>
            {{ todo.title }}
          </q-item-main>
        </q-item>
      </q-list>
    </div>

    <q-btn
      v-if="!todos.length && !loading"
      label="Seed Data"
      color="tertiary"
      class="q-mt-md"
      @click="seedData()"
    />

  </q-page>
</template>

<style>
</style>

<script>
import seedData from '../../data/todos'

export default {
  name: 'PageIndex',

  data () {
    return {
      loading: true,
      todos: []
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {
      this.loading = true
      this.todos = []

      let collection = this.$firebase.firestore().collection('todos')

      collection.get()
        .then(querySnapshot => {
          querySnapshot.forEach(todo => {
            this.todos.push(todo.data())
          })
          this.loading = false
        })
        .catch(error => console.error(error))
    },

    seedData () {
      let collection = this.$firebase.firestore().collection('todos')

      seedData.forEach(todo => {
        collection.doc().set(todo)
          .then(() => {
            console.log('Created', todo.title)
            })
          .catch(error => console.error(error))
      })

      this.getData()
    }
  }
}
</script>
