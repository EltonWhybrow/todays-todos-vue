<template>
  <form @submit.prevent="onSubmit" class="add-form">
    <div class="form-control">
      <label
        >Task
        <input
          type="text"
          v-model="title"
          name="title"
          placeholder="Add Task"
          :class="[title.length < 1 ? 'border-gray-300' : 'border-green-600']"
        />
      </label>
    </div>

    <div class="form-control">
      <label
        >Category
        <select v-model="category">
          <option value="">None</option>
          <option value="WideSign">WideSign</option>
          <option value="Personal">Personal</option>
          <option value="Jobs">Jobs</option>
          <option value="UBER">UBER</option>
        </select>
      </label>
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

    <input
      type="submit"
      value="Add Todo"
      class="btn btn-block"
      v-bind:disabled="description < 1 || title < 1"
    />
  </form>
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
  methods: {
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
.add-form {
  margin-bottom: 40px;
}
.form-control {
  @apply mb-5;
}
.form-control label {
  @apply block text-blue-700;
}
.form-control input:not([type="checkbox"]),
.form-control select,
.form-control textarea {
  @apply border shadow w-full h-10 p-2 text-base;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}

.form-control textarea {
  flex: 2;
  height: 80px;
  font-family: inherit;
  font-size: inherit;
}
</style>