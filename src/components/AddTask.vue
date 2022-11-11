<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" v-model="text" name="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Description</label>
      <textarea
        rows="10"
        type="text"
        v-model="description"
        name="description"
        placeholder="Add Description"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "app-form",
  data() {
    return {
      text: "",
      description: "",
      reminder: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.text) {
        alert("Please add text");
        return;
      }

      const newTask = {
        // id: Math.floor(Math.random() * 100000 + 3),
        text: this.text,
        description: this.description,
        reminder: this.reminder,
      };

      this.text = "";
      this.description = "";
      this.reminder = false;

      //   console.log(">>>LOG>>>", newTask);
      this.$emit("add-task", newTask);
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