<template>
  <button
    @click="onClick()"
    :style="{ background: color }"
    type="button"
    class="btn"
  >
    {{ text }}
    <svg
      v-show="icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="ml-2 -mr-1 w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "app-button",
  props: {
    text: String,
    color: String,
    icon: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>