<template>
  <div>
    <AddTasksForm
      v-show="showAddTask"
      @add-task="addTask"
      @toggle-add-task="$emit('toggle-add-task')"
    />
    <!-- v-show="showFilterText" -->
    <ul id="filter" class="flex justify-end mb-4">
      <li class="text-xs py-1 px-2">Filter:</li>
      <li
        @click.prevent="resetFilter()"
        :class="[
          currentFilter === 'none' ? 'bg-blue-400 text-white' : 'bg-gray-200',
        ]"
      >
        All
      </li>

      <li
        @click.prevent="filterCategory('WideSign')"
        :class="[
          currentFilter === 'WideSign'
            ? 'bg-blue-400 text-white'
            : 'bg-gray-200',
        ]"
      >
        WideSign
      </li>
      <li
        @click.prevent="filterCategory('Personal')"
        :class="[
          currentFilter === 'Personal'
            ? 'bg-blue-400 text-white'
            : 'bg-gray-200',
        ]"
      >
        Personal
      </li>
      <li
        @click.prevent="filterCategory('Jobs')"
        :class="[
          currentFilter === 'Jobs' ? 'bg-blue-400 text-white' : 'bg-gray-200',
        ]"
      >
        Jobs
      </li>
      <li
        @click.prevent="filterCategory('UBER')"
        :class="[
          currentFilter === 'UBER' ? 'bg-blue-400 text-white' : 'bg-gray-200',
        ]"
      >
        UBER
      </li>
    </ul>

    <div class="text-center w-full" v-if="!this.tasks.length">
      <p class="text-md my-6">Currently no todos in '{{ currentFilter }}'</p>
    </div>

    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      @edit-task="editTask"
      @filter-category="filterCategory"
      @resetFilter="resetFilter"
      :tasks="tasks"
      :showEditTask="showEditTask"
    />
  </div>
</template>

<script>
import Tasks from "../components/Tasks";
import AddTasksForm from "../components/AddTask.vue";

export default {
  name: "app-home",
  props: {
    showAddTask: Boolean,
    showFilterText: Boolean,
    showEditTask: Boolean,
  },
  components: {
    Tasks,
    AddTasksForm,
  },
  data() {
    return {
      tasks: [],
      currentFilter: "",
    };
  },
  emits: ["toggle-add-task"],
  methods: {
    async resetFilter() {
      this.currentFilter = "none";
      this.tasks = await this.fetchTodos();
      this.$emit("toggle-filter-text");
    },
    async filterCategory(category) {
      this.tasks = await this.fetchTodos();
      this.currentFilter = category;
      const catSorted = this.tasks.filter((t) => {
        return t.category === category;
      });
      this.tasks = catSorted;
      this.$emit("toggle-filter-text");
    },
    async addTask(task) {
      // add new todo to database
      const res = await fetch("api/todos/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      this.tasks = [...this.tasks, data];
      this.$emit("toggle-add-task");
    },

    async deleteTask(id) {
      if (confirm("Are you sure you want to delete?")) {
        const res = await fetch(`api/todos/todo/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("deleting task");
      }
    },

    async editTask(id) {
      this.$router.push({ path: "/edit", query: { todo: id } });
    },

    async toggleReminder(id) {
      const taskToToggle = await this.fetchTodo(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const res = await fetch(`api/todos/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },

    // NODE server to mongoDB
    async fetchTodos() {
      const res = await fetch("api/todos/");
      const data = await res.json();
      return data;
    },
    async fetchTodo(id) {
      const res = await fetch(`api/todos/todo/${id}`);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTodos();
  },
};
</script>

<style scoped>
#filter li:not(:first-child) {
  @apply rounded py-1 px-2 text-xs mx-1 cursor-pointer;
}
</style>