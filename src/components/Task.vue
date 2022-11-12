<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.title }} <i @click="onDelete(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.description }}</p>
    <span v-if="task.category" class="category">{{ task.category }}</span>
  </div>
</template>

<script>
export default {
  name: "app-task",
  props: {
    task: Object,
  },
  methods: {
    onDelete(id) {
      // console.log('>>>LOG>>>', id);

      this.$emit("delete-task", id);
    },
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