<template>
  <span class="c-pointer" :class="[type]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'default' | 'primary' | 'danger' | 'warning' | 'success';
}>();
</script>

<style lang="scss">
.default {
  color: #e7e7e7;
}

.primary {
  color: #0052d9;
}

.danger {
  color: #e34d59;
}

.warning {
  color: #ed7b2f;
}

.success {
  color: #00a870;
}

.c-pointer {
  cursor: pointer;
  -moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
