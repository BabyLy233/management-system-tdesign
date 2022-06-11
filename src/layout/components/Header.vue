<template>
  <t-header>
    <t-row class="pt-4">
      <t-col :span="4">
        <div></div>
      </t-col>
      <t-col :span="2" :offset="6">
        <div>
          <t-avatar :image="avatarUrl" class="mr-2" size="38px" />
          <t-dropdown :options="options" placement="bottom" :min-column-width="112" @click="clickHandler">
            <t-button variant="text">
              <span>用户名</span>
              <ChevronDownIcon class="pb-1" />
            </t-button>
          </t-dropdown>
        </div>
      </t-col>
    </t-row>
  </t-header>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { ChevronDownIcon, UserCircleIcon, PoweroffIcon } from 'tdesign-icons-vue-next';

const avatarUrl = ref<string>('https://pic.imgdb.cn/item/62a466830947543129b5f22e.jpg');
const options = [
  {
    content: () => {
      return (
        <>
          <UserCircleIcon size="large" class="text-blue-600" />
          <span>&nbsp;用户中心</span>
        </>
      );
    },
    value: 1,
  },
  {
    content: () => {
      return (
        <>
          <PoweroffIcon size="large" class="text-red-600" />
          <span>&nbsp;退出登录</span>
        </>
      );
    },
    value: 2,
  },
];

const clickHandler = () => {};
</script>
