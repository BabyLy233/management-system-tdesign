<template>
  <t-content>
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </t-content>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
