<template>
  <button type="button" :class="`btn btn-${bgColor}`" @click="$emit('click')">
    <i :class="icon"></i>
    {{ text }}
  </button>
</template>

<script setup>
defineEmits(["click"]);

const { text } = defineProps({
  text: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "primary",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>
