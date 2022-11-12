<template>
  <div>
    <AddTasksForm v-show="showAddTask" @add-task="addTask" />
    <Tasks
      @toggle-reminder="toggleReminder"
      @delete-task="deleteTask"
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
  },
  components: {
    Tasks,
    AddTasksForm,
  },
  data() {
    return {
      tasks: [],
      todos: [],
    };
  },
  methods: {
    async addTask(task) {
      console.log(">>>THE TASK >>>", task);
      const res = await fetch("api/todos/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      this.tasks = [...this.tasks, data];
      console.log(">>>LOG!!!>>>", this.tasks);
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
    // json server
    // async fetchTasks() {
    //   const res = await fetch("api/tasks");
    //   const data = await res.json();
    //   return data;
    // },
    // async fetchTask(id) {
    //   const res = await fetch(`api/tasks/${id}`);
    //   const data = await res.json();
    //   return data;
    // },
  },
  async created() {
    // this.tasks = await this.fetchTasks();
    this.tasks = await this.fetchTodos();
    console.log(">>>TASK >>>", this.tasks);

    // this.todos = await this.fetchTodo();
  },
};
</script>