<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">New Todo</h1>
    <form @submit.prevent="onSubmit" class="add-form">
      <div class="form-control">
        <label
          >Add Todo
          <input
            type="text"
            v-model="title"
            name="title"
            placeholder="Todo"
            :class="[title.length < 1 ? 'border-gray-300' : 'border-green-600']"
          />
        </label>
      </div>

      <div class="form-control">
        <label for="category">Category</label>
        <select v-model="category">
          <option value="">None</option>
          <option value="WideSign">WideSign</option>
          <option value="Personal">Personal</option>
          <option value="Jobs">Jobs</option>
          <option value="UBER">UBER</option>
        </select>
      </div>

      <!-- <div class="form-control">
      <label>Category</label>
      <input
        type="text"
        v-model="category"
        name="category"
        placeholder="Add Category"
        :class="[title.length < 1 ? 'red' : 'green']"
      />
    </div> -->
      <div class="form-control">
        <label
          >Description
          <textarea
            rows="10"
            type="text"
            v-model="description"
            name="description"
            placeholder="Add Description"
            :class="[
              description.length < 1 ? 'border-gray-300' : 'border-green-600',
            ]"
          />
        </label>
      </div>
      <div class="form-control hidden">
        <label for="reminder">Completed</label>
        <input class="btn" type="checkbox" name="reminder" id="reminder" />
      </div>

      <input type="submit" value="Add Todo" class="btn btn-block" />
      <!-- v-bind:disabled="description < 1 || title < 1" -->
      <p class="text-center w-full mt-1">
        <span @click="$emit('toggle-add-task')">Cancel</span>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "app-form",
  data() {
    return {
      title: "",
      description: "",
      category: "",
      reminder: false,
      dateTime: "",
    };
  },
  emits: ["toggle-add-task"],
  methods: {
    // cancelAddTask() {
    //   console.log("1");
    //   this.$emit("toggle-add-task");
    // },
    onSubmit() {
      if (!this.title) {
        alert("Please add title");
        return;
      }

      if (!this.description) {
        alert("Please add description");
        return;
      }

      const newTask = {
        id: Math.floor(Math.random() * 100000 + 3),
        title: this.title,
        category: this.category,
        description: this.description,
        reminder: this.reminder,
        dateTime: new Date().getTime() / 1000,
      };

      this.title = "";
      this.description = "";
      this.category = "";
      this.reminder = false;

      console.log(">>>LOG>>>", newTask);

      this.$emit("add-task", newTask);
    },
  },
};
</script>


<style scoped>
.btn {
  @apply bg-blue-800 hover:bg-blue-900 w-full flex justify-center;
}
</style>