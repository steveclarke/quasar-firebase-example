<template>
  <q-page padding>

    <div v-if="loading">
      <q-spinner /> Fetching data...
    </div>

    <div v-else>
      <q-list>
        <q-item-label header>Todos</q-item-label>
        <q-item
          v-for="(todo, index) in todos"
          :key="index"
        >
          <q-item-label>
            {{ todo.title }}
          </q-item-label>
        </q-item>
      </q-list>
    </div>

    <q-btn
      v-if="!todos.length && !loading"
      label="Seed Data"
      class="q-mt-md"
      @click="seedData()"
    />

  </q-page>
</template>

<style>
</style>

<script>
import seedData from '../../data/todos.json'

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
