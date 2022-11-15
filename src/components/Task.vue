<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <div style="display: flex; justify-content: space-between">
      <div>
        <h3>
          {{ task.title }}
        </h3>
        <p>{{ task.description }}</p>
        <span v-if="task.category" class="category">{{ task.category }}</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <i
          @click="$emit('delete-task', task.id)"
          class="delete fas fa-times"
        ></i>
        <i
          @click="$emit('edit-task', task.id)"
          class="edit fas fa-pen-to-square"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-task",
  props: {
    task: Object,
  },
};
</script>

<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border-left: 5px solid lightgrey;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category {
  border-radius: 15px;
  padding: 2px 7px;
  background-color: lightgray;
}
</style>