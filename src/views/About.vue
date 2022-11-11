<template>
  <div>
    <h1>About</h1>
    <h3>Version 1.0.0</h3>
    <router-link to="/">Back home</router-link>
  </div>
</template>

<script>
export default {
  name: "app-about",
  props: {
    showAddTask: Boolean,
  },
};
</script>