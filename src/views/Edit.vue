<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Edit Todo</h1>
    <!-- {{ todo }} -->
    <form @submit.prevent="onUpdateTodo" class="add-form">
      <div class="form-control">
        <label>Todo</label>
        <input
          type="text"
          v-model="todo.title"
          name="title"
          placeholder="Edit Title"
        />
      </div>
      <div class="form-control">
        <label>Category</label>
        <ul id="category" class="flex justify-start space-x-2">
          <li>
            <label for="WideSign">WideSign</label>
            <input
              class="w-4 h-4"
              v-model="todo.category"
              type="radio"
              id="WideSign"
              name="fav_language"
              value="WideSign"
              :checked="'WideSign' === todo.category"
            />
          </li>
          <li>
            <label for="Ascential">Ascential</label>
            <input
              class="w-4 h-4"
              v-model="todo.category"
              type="radio"
              id="Ascential"
              name="fav_language"
              value="Ascential"
              :checked="'Ascential' === todo.category"
            />
          </li>
          <li>
            <label for="Personal">Personal</label>
            <input
              class="w-4 h-4"
              v-model="todo.category"
              type="radio"
              id="Personal"
              name="fav_language"
              value="Personal"
              :checked="'Personal' === todo.category"
            />
          </li>
          <li>
            <label for="Jobs">Jobs</label>
            <input
              class="w-4 h-4"
              v-model="todo.category"
              type="radio"
              id="Jobs"
              name="fav_language"
              value="Jobs"
              :checked="'Jobs' === todo.category"
            />
          </li>
          <li>
            <label for="UBER">UBER</label>
            <input
              class="w-4 h-4"
              v-model="todo.category"
              type="radio"
              id="UBER"
              name="fav_language"
              value="UBER"
              :checked="'UBER' === todo.category"
            />
          </li>
        </ul>
      </div>
      <div class="form-control">
        <label>Description</label>
        <textarea
          rows="10"
          type="text"
          v-model="todo.description"
          name="description"
          placeholder="Edit description"
        />
      </div>
      <div class="form-control">
        <label>Notes</label>
        <textarea
          rows="10"
          type="text"
          v-model="todo.notes"
          name="notes"
          placeholder="Edit notes"
        />
      </div>
      <div class="form-control flex justify-start space-x-2">
        <label for="completed">Completed</label>
        <input
          class="w-4 h-4 mt-1"
          id="completed"
          type="checkbox"
          v-model="todo.completed"
          name="completed"
        />
      </div>
      <div class="form-control flex justify-start space-x-2">
        <label for="completed">Reminder</label>
        <input
          class="w-4 h-4 mt-1"
          id="reminder"
          type="checkbox"
          v-model="todo.reminder"
          name="reminder"
        />
      </div>

      <input type="submit" value="Update Todo" class="btn" />
      <p class="text-center w-full mt-1">
        <router-link to="/">Cancel</router-link>
      </p>
    </form>
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
    const res = await fetch(
      `${process.env.VUE_APP_API_BASE_URL}/todos/todo/${this.$route.query.todo}`,
      {
        method: "GET",
      }
    );
    const todoToEdit = await res.json();
    this.todo = todoToEdit;
  },
  methods: {
    onUpdateTodo() {
      if (!this.todo.title) {
        alert("Please add title");
        return;
      }

      if (!this.todo.description) {
        alert("Please add description");
        return;
      }

      const updateTask = {
        id: this.todo.id,
        title: this.todo.title,
        category: this.todo.category,
        description: this.todo.description,
        notes: this.todo.notes,
        reminder: this.todo.reminder,
        completed: this.todo.completed,
      };

      this.$emit("update-task", updateTask);
    },
  },
};
</script>


<style scoped>
.btn {
  @apply bg-blue-800 hover:bg-blue-900 w-full flex justify-center;
}
</style>