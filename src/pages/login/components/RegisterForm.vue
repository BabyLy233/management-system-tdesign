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
      <t-form-item name="repeatPwd">
        <t-input v-model="repeatPwd" type="password" clearable placeholder="请再次输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="email">
        <t-input v-model="formData.email" type="text" clearable placeholder="请输入邮箱">
          <template #prefix-icon>
            <mail-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item name="phone">
        <t-input v-model="formData.phone" type="tel" clearable placeholder="请输入手机号">
          <template #prefix-icon>
            <mobile-icon />
          </template>
        </t-input>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" block>注册</t-button>
      </t-form-item>
      <t-form-item>
        <t-button theme="default" type="reset" block>重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { registerParam } from '@/interfaces';
import { DesktopIcon, LockOnIcon, MailIcon, MobileIcon } from 'tdesign-icons-vue-next';

const formData = reactive<registerParam>({
  account: '',
  password: '',
  email: '',
  phone: '',
});
const repeatPwd = ref<string>('');

const onReset = () => {
  formData.account = '';
  formData.password = '';
  formData.email = '';
  formData.phone = '';
  repeatPwd.value = '';
};

const onSubmit = () => {
  // 提交注册
};
</script>
