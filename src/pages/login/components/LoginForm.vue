<template>
  <div>
    <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
      <t-form-item name="account">
        <t-input v-model="formData.account" clearable placeholder="请输入用户名">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
      <t-form-item>
        <t-button theme="default" type="reset" block>重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { loginParam } from '@/interfaces';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const formData = reactive<loginParam>({
  account: '',
  password: '',
});

const onReset = () => {
  formData.account = '';
  formData.password = '';
};

const onSubmit = () => {

};
</script>
