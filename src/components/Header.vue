<template>
  <header>
    <div class="container px-8 max-w-2xl mx-auto flex justify-between py-5">
      <h1 class="text-white font-semibold uppercase text-2xl mt-1">
        <router-link to="/"> {{ title }} </router-link>
      </h1>
      <div>
        <Button
          @btn-click="$emit('toggle-edit-task')"
          :text="showEditTask ? 'delete' : 'edit'"
          v-show="homePage"
          :icon="false"
        />
        <Button
          @btn-click="$emit('toggle-add-task')"
          :text="addTaskOpen ? 'Close' : 'Add Todo'"
          :class="
            addTaskOpen
              ? 'bg-rose-500 hover:bg-red-400'
              : 'bg-blue-800  hover:bg-blue-700'
          "
          v-show="homePage"
          :icon="true"
        />
      </div>
    </div>
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "app-header",
  props: {
    title: String,
    addTaskOpen: Boolean,
    showEditTask: Boolean,
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
</style>