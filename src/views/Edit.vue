<template>
  <div>
    <h1>Edit ({{ todo.title }})</h1>
    <h1>Edit ({{ todo }})</h1>
    <h3>Version 1.0.0</h3>
    <label>Task</label>
    <input
      type="text"
      v-model="todo.title"
      name="title"
      placeholder="Edit Title"
    />
    <label>Task</label>
    <input
      type="text"
      v-model="todo.description"
      name="description"
      placeholder="Edit description"
    />
    <router-link to="/">Back home</router-link>
  </div>
</template>

<script>
export default {
  name: "app-edit",
  props: {},
  data() {
    return {
      todo: [],
    };
  },
  async mounted() {
    const res = await fetch(`api/todos/todo/${this.$route.query.todo}`, {
      method: "GET",
    });

    const todoToEdit = await res.json();
    this.todo = todoToEdit;
    console.log(" todo to edit in editme component", todoToEdit);
  },
};
</script>