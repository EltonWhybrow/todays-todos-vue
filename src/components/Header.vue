<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      @btn-click="$emit('toggle-add-task')"
      :text="addTaskOpen ? 'Close' : 'AddTask'"
      :color="addTaskOpen ? 'red' : 'green'"
      v-show="homePage"
    />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "app-header",
  props: {
    title: String,
    addTaskOpen: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === "/") {
        return true;
      } else {
        return false;
      }
    },
  },
  emits: ["toggle-add-task"],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>