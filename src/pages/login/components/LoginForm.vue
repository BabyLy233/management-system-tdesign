<template>
  <div>
    <t-form
      ref="form"
      :data="formData"
      :colon="true"
      :rules="rules"
      :label-width="0"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item name="username">
        <t-input v-model="formData.username" clearable placeholder="请输入用户名">
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
import { useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import type { SubmitContext } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import type { loginParam } from '@/interfaces';
import { login } from '@/api/auth';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();

const formData = reactive<loginParam>({
  username: '',
  password: '',
});

const rules = {
  username: [{ required: true, message: '用户名必填', type: 'error', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填', type: 'error', trigger: 'blur' }],
};

const onReset = () => {
  formData.username = '';
  formData.password = '';
};

const onSubmit = ({ validateResult }: SubmitContext) => {
  if (validateResult !== true) return;
  login({
    username: formData.username,
    password: formData.password,
  }).then((res) => {
    if (res.code !== 10001) {
      MessagePlugin.error(res.message);
      return;
    }
    userStore.afterLogin(res.data);
    MessagePlugin.success(res.message);
    setTimeout(() => {
      location.href = '/';
    }, 1000);
  });
};
</script>
