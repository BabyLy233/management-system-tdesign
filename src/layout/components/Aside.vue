<template>
  <t-affix ref="affix" :offset-top="0">
    <t-aside>
      <t-menu
        theme="light"
        :value="currentName"
        :default-value="currentName"
        style="margin-right: 40px"
        height="550px"
        @change="changeHandler"
      >
        <template #logo>
          <img
            class="cursor-pointer logo-img"
            src="@/assets/ly-logo.png"
            alt="logo"
            height="64px"
            @click="goHome(router)"
          />
        </template>
        <template #operations>
          <span class="text-indigo-500 text-lg">
            {{ appTitle + '&emsp;' + appVersion }}
          </span>
        </template>
        <t-menu-item :value="item.name" v-for="item in menuItems">
          <template #icon>
            <t-icon :name="item.meta?.icon" />
          </template>
          {{ item.meta?.title }}
        </t-menu-item>
      </t-menu>
    </t-aside>
  </t-affix>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { MenuValue } from 'tdesign-vue-next';
import { appTitle, appVersion } from '@/utils/constant';
import { goHome, getMenuItem } from '@/utils/usePage';

const router = useRouter();
const route = useRoute();
const menuItems = getMenuItem();
const currentName = ref<string | unknown>(route.name);

watch(
  () => route.name as string,
  (newName) => (currentName.value = newName),
);

const changeHandler = (value: MenuValue) => {
  router.push(`/home/${value}`);
};
</script>
