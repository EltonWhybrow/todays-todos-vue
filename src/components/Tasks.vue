<template>
  <div :key="task.id" v-for="task in tasks">
    <Task
      @toggle-reminder="$emit('toggle-reminder', task.id)"
      @toggle-completed="$emit('toggle-completed', task.id)"
      @delete-task="$emit('delete-task', task.id)"
      @filter-category="$emit('filterCategory', task.category)"
      @edit-task="$emit('edit-task', task.id)"
      :task="task"
      :showEditTask="showEditTask"
    />
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "app-tasks",
  props: {
    tasks: Array,
    showEditTask: Boolean,
  },
  components: {
    Task,
  },
  method: {},
  emits: [
    "delete-task",
    "edit-task",
    "toggle-reminder",
    "toggle-completed",
    "filterCategory",
    "resetFilter",
  ],
};
</script>