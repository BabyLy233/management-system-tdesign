<template>
  <t-affix ref="affix" :offset-top="0">
    <t-header>
      <t-row class="header-row">
        <t-col :span="4">
          <div></div>
        </t-col>
        <t-col :span="2" :offset="6">
          <t-space>
            <t-tooltip content="前往 Github 仓库">
              <LogoGithubFilledIcon size="28px" class="github-icon cursor-pointer" @click="goGit" />
            </t-tooltip>
            <div>
              <t-avatar :image="avatarUrl" class="header-avatar" size="38px" />
              <t-dropdown :min-column-width="128" placement="bottom" @click="clickHandler">
                <t-button variant="text"> {{ userStore.userInfo.username }} <ChevronDownIcon /></t-button>
                <template #dropdown>
                  <t-dropdown-menu>
                    <t-dropdown-item :value="1">
                      <UserCircleIcon size="20px" style="color: dodgerblue; line-height: 5px" /> 用户中心
                    </t-dropdown-item>
                    <t-dropdown-item :value="2">
                      <PoweroffIcon size="20px" style="color: red; line-height: 5px" /> 退出登录
                    </t-dropdown-item>
                  </t-dropdown-menu>
                </template>
              </t-dropdown>
            </div>
          </t-space>
        </t-col>
      </t-row>
    </t-header>
  </t-affix>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownOption } from 'tdesign-vue-next';
import { ChevronDownIcon, UserCircleIcon, PoweroffIcon, LogoGithubFilledIcon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const avatarUrl = ref<string>('https://pic.imgdb.cn/item/62a466830947543129b5f22e.jpg');

const clickHandler = (dropdownItem: DropdownOption) => {
  if (dropdownItem.value === 2) {
    userStore.logout();
    setTimeout(() => {
      location.href = '/login';
    }, 800);
  }
};

const goGit = () => {
  window.open('https://github.com/BabyLy233/management-system-tdesign');
};
</script>
