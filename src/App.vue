<template>
  <t-config-provider :global-config="zhConfig">
    <RouterView />
  </t-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN';
</script>

<style lang="scss">
@import '@/styles/base.scss';
</style>
