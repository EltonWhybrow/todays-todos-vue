<template>
  <footer>
    <p>copyright &copy; 2022</p>
    <router-link to="/about">About</router-link>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>

<style scoped>
a {
  color: #333;
}
footer {
  margin-top: 30px;
  text-align: center;
}
</style>