<template>
  <div
    @dblclick="$emit('toggle-reminder', task.id)"
    :class="[
      task.reminder ? 'reminder' : '',
      task.completed ? 'completed text-green-700 line-through' : '',
      'task',
    ]"
  >
    <div class="flex justify-between">
      <div class="flex flex-row justify-between">
        <div
          @click="$emit('toggle-completed', task.id)"
          class="
            text-2xl
            py-4
            pr-0
            pl-4
            flex
            justify-center
            align-middle
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="[task.completed ? 'text-green-700' : 'text-gray-400']"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div class="py-2 pr-5 pl-4 w-full">
        <div class="flex justify-between">
          <h3 class="text-md md:text-lg">
            {{ task.title }}
          </h3>
          <div
            @click="$emit('filter-category', task.category)"
            v-if="task.category"
            class="category h-6 ml-3"
          >
            {{ task.category }}
          </div>
        </div>
        <p class="text-xs md:text-sm py-1">{{ task.description }}</p>
      </div>
      <div class="flex flex-row justify-between">
        <div
          v-show="showEditTask"
          @click="$emit('edit-task', task.id)"
          class="
            text-2xl
            p-5
            bg-blue-400
            flex
            justify-center
            align-middle
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>

        <div
          v-show="!showEditTask"
          @click="$emit('delete-task', task.id)"
          class="
            text-2xl
            p-5
            bg-rose-800
            flex
            justify-center
            align-middle
            items-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-task",
  props: {
    task: Object,
    showEditTask: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.fas {
  @apply text-gray-200;
}
.task {
  @apply bg-gray-50 my-2 shadow cursor-pointer border-l-4 border-l-gray-400;
}

.task.reminder {
  @apply border-l-green-600 bg-gray-300;
}

.category {
  @apply rounded bg-gray-200 py-1 px-2 text-xs;
}
</style>