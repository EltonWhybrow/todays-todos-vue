<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">About</h1>

    <h3 class="font-semibold text-lg">Version 1.0.2</h3>
    <ul class="text-gray-500">
      <li>Added notes</li>
      <li>Added completed</li>
    </ul>
    <h3 class="font-semibold text-lg">Version 1.0.1</h3>
    <ul class="text-gray-500">
      <li>Added categories</li>
    </ul>
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