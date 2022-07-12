<template>
  <div id="page-404">
    <img src="@/assets/404.png" alt="404Img" class="img-404" />
    <t-button theme="primary" @click="goHome(router)">
      <template #icon>
        <LaptopIcon />
      </template>
      回到首页
    </t-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { LaptopIcon } from 'tdesign-icons-vue-next';
import { goHome } from '@/utils/usePage';

const router = useRouter();
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
