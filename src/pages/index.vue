<template>
  <q-page padding>

    <div v-if="loading">
      <q-spinner /> Fetching data...
    </div>

    <div v-else>
      <q-list>
        <q-list-header>Todos</q-list-header>
        <q-item
          v-for="todo in todos"
          :key="todo.title"
        >
          <q-item-main>
            {{ todo.title }}
          </q-item-main>
        </q-item>
      </q-list>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      loading: true,
      todos: []
    }
  },

  created () {
    let collection = this.$firebase.firestore().collection('todos')

    collection.get()
      .then(querySnapshot => {
        querySnapshot.forEach(todo => {
          this.todos.push(todo.data())
        })
        this.loading = false
      })
      .catch(error => console.error(error))
  }
}
</script>
