<template>
  <div>
    <h1>Edit</h1>
    <h3>Edit todo</h3>

    {{ todo }}

    <form @submit.prevent="onUpdateTodo" class="add-form">
      <div class="form-control">
        <label>Title</label>
        <input
          type="text"
          v-model="todo.title"
          name="title"
          placeholder="Edit Title"
        />
      </div>
      <div class="form-control">
        <label>Category</label>

        <label for="WideSign">WideSign</label><br />
        <input
          v-model="todo.category"
          type="radio"
          id="WideSign"
          name="fav_language"
          value="WideSign"
          :checked="'WideSign' === todo.category"
        />

        <label for="Personal">Personal</label><br />
        <input
          v-model="todo.category"
          type="radio"
          id="Personal"
          name="fav_language"
          value="Personal"
          :checked="'Personal' === todo.category"
        />

        <label for="Jobs">Jobs</label><br />
        <input
          v-model="todo.category"
          type="radio"
          id="Jobs"
          name="fav_language"
          value="Jobs"
          :checked="'Jobs' === todo.category"
        />

        <label for="UBER">UBER</label><br />
        <input
          v-model="todo.category"
          type="radio"
          id="UBER"
          name="fav_language"
          value="UBER"
          :checked="'UBER' === todo.category"
        />
      </div>
      <div class="form-control">
        <label>Description</label>
        <input
          type="text"
          v-model="todo.description"
          name="description"
          placeholder="Edit description"
        />
      </div>
      <div class="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" v-model="todo.reminder" name="reminder" />
      </div>

      <input
        type="submit"
        value="Update Task"
        class="btn btn-block"
        v-bind:disabled="todo.description < 1 || todo.title < 1"
      />
    </form>

    <router-link to="/">Back home</router-link>
  </div>
</template>

<script>
export default {
  name: "app-edit",
  props: {},
  data() {
    return {
      todo: [],
    };
  },
  async mounted() {
    const res = await fetch(`api/todos/todo/${this.$route.query.todo}`, {
      method: "GET",
    });
    const todoToEdit = await res.json();
    this.todo = todoToEdit;
  },
  methods: {
    onUpdateTodo() {
      if (!this.todo.title) {
        alert("Please add title");
        return;
      }

      if (!this.todo.description) {
        alert("Please add description");
        return;
      }

      const updateTask = {
        id: this.todo.id,
        title: this.todo.title,
        category: this.todo.category,
        description: this.todo.description,
        reminder: this.todo.reminder,
      };

      this.$emit("update-task", updateTask);
    },
  },
};
</script>


<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input,
.form-control textarea {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
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