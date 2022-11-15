<template>
  <div>
    <AddTasksForm v-show="showAddTask" @add-task="addTask" />
    <div @click.prevent="resetFilter" v-show="showFilterText">Reset filter</div>
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
      @edit-task="editTask"
      @filter-category="filterCategory"
      @resetFilter="resetFilter"
      :tasks="tasks"
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
  },
  components: {
    Tasks,
    AddTasksForm,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async resetFilter() {
      this.tasks = await this.fetchTodos();
      this.$emit("toggle-filter-text");
    },
    filterCategory(category) {
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
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/todos/todo/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.tasks = this.tasks.filter((task) => task.id !== id))
          : alert("deleting task");
      }
    },

    async editTask(id) {
      if (confirm("Are you sure you want to edit?")) {
        this.$router.push({ path: "/edit", query: { todo: id } });
      }
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