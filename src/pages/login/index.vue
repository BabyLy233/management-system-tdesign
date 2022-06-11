<template>
  <div id="page-login">
    <div class="comp-loginForm rounded-3xl">
      <div class="div-title text-3xl font-bold leading-relaxed">
        <h2>{{ formType === 'login' ? '登录' : '注册' }}</h2>
        <h2>{{ appTitle }}</h2>
      </div>
      <div class="div-dynamic-desc mb-3 pl-56">
        <p>
          {{ formType === 'login' ? '没有账户?' : '已有账户?' }}
          <TextLink type="primary" @click="formType === 'login' ? (formType = 'register') : (formType = 'login')">
            {{ formType === 'login' ? '立即注册' : '立即登录' }}
          </TextLink>
        </p>
      </div>
      <LoginForm v-if="formType === 'login'" />
      <RegisterForm v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NotifyPlugin } from 'tdesign-vue-next';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import TextLink from '@/components/text-link/index.vue';
import { appTitle, appVersion } from '@/utils/constant';

const formType = ref<string>('login');

NotifyPlugin('info', {
  duration: 10000,
  title: `欢迎使用 ${appTitle} ✨`,
  content: `当前版本: ${appVersion}`,
  footer: `作者: baby李`,
  closeBtn: true,
});
</script>

<style lang="scss">
@import './index.scss';
</style>
