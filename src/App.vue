<template>
  <div class="main">
    <Header
      class="sticky top-0 bg-blue-400"
      :showEditTask="showEditTask"
      :addTaskOpen="showAddTask"
      @toggle-add-task="toggleAddTask"
      @toggle-edit-task="toggleEditTask"
      title="Todays Todos"
    />
    <div class="container max-w-2xl mx-auto my-4 px-2 md:my-8 md:px-8">
      <router-view
        :showEditTask="showEditTask"
        :showAddTask="showAddTask"
        :showFilterText="showFilterText"
        @update-task="updateTask"
        @toggle-add-task="toggleAddTask"
        @toggle-filter-text="toggleFilterText"
      ></router-view>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showAddTask: false,
      showFilterText: false,
      showEditTask: true,
    };
  },
  mounted() {
    document.title = "Todays Todos - Elton Tasklist in vue primer";
  },
  methods: {
    // toogle task acrions
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
    },
    toggleEditTask() {
      this.showEditTask = !this.showEditTask;
    },
    toggleFilterText() {
      this.showFilterText = !this.showFilterText;
    },
    // update task from edit screen
    async updateTask(task) {
      const taskToUpdate = await this.fetchTodo(task.id);
      const updatedTask = { ...taskToUpdate, ...task };

      fetch(`${process.env.VUE_APP_API_BASE_URL}/todos/todo/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      // return to home view
      this.$router.push({ path: "/" });
    },
    // NODE server to mongoDB
    async fetchTodo(id) {
      const res = await fetch(
        `${process.env.VUE_APP_API_BASE_URL}/todos/todo/${id}`
      );
      const data = await res.json();
      return data;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.btn {
  @apply text-white
      font-normal
      rounded-lg
      text-sm
      px-3
      py-2
      text-center
      inline-flex
      items-center
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}

/* .btn:disabled {
  background: #dddddd !important;
} */

/* // Form styles */
.add-form {
  margin-bottom: 40px;
}
.form-control {
  @apply mb-5;
}
.form-control label {
  @apply block mb-1;
}
.form-control input:not([type="checkbox"], [type="radio"]),
.form-control select,
.form-control textarea {
  @apply border w-full h-10 p-2 text-base;
}
.form-control textarea {
  height: 80px;
  vertical-align: top;
}
.form-control-check {
  @apply flex align-middle justify-start;
}
.form-control-check label {
}
.form-control-check input {
  height: 24px;
}

#category li {
  @apply text-center text-xs bg-gray-300 py-2 px-3 rounded w-24;
}

#category li label {
  @apply mb-1;
}
</style>
