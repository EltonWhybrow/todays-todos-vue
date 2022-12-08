<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">New Todo</h1>
    <form @submit.prevent="onSubmit" class="add-form">
      <div class="form-control">
        <label for="title">Add Todo </label>
        <input
          id="title"
          type="text"
          v-model="title"
          name="title"
          placeholder="Todo"
          :class="[title.length < 1 ? 'border-gray-300' : 'border-green-600']"
        />
      </div>

      <div class="form-control">
        <label for="category">Category</label>
        <select v-model="category" id="category">
          <option value="">None</option>
          <option value="WideSign">WideSign</option>
          <option value="Ascential">Ascential</option>
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
      <!-- description -->
      <div class="form-control">
        <label for="description">Description </label>
        <textarea
          id="description"
          rows="10"
          type="text"
          v-model="description"
          name="description"
          placeholder="Add Description"
          :class="[
            description.length < 1 ? 'border-gray-300' : 'border-green-600',
          ]"
        />
      </div>
      <div class="form-control">
        <label for="notes">Notes</label>
        <textarea
          id="notes"
          rows="10"
          type="text"
          v-model="notes"
          name="notes"
          placeholder="Add Notes"
          :class="[
            description.length < 1 ? 'border-gray-300' : 'border-green-600',
          ]"
        />
      </div>

      <div class="form-control hidden">
        <label for="completed">Completed</label>
        <input class="btn" type="checkbox" name="completed" id="completed" />
      </div>
      <div class="form-control hidden">
        <label for="reminder">Reminder</label>
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
      notes: "",
      category: "",
      reminder: false,
      completed: false,
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
        notes: this.notes,
        reminder: this.reminder,
        completed: this.completed,
        dateTime: new Date().getTime() / 1000,
      };

      this.title = "";
      this.description = "";
      this.notes = "";
      this.category = "";
      this.reminder = false;
      this.completed = false;

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