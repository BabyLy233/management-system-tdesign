<template>
  <div>
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :colon="true"
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
import { MessagePlugin } from 'tdesign-vue-next';
import type { SubmitContext } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon, MailIcon, MobileIcon } from 'tdesign-icons-vue-next';
import type { registerParam } from '@/interfaces';
import { register } from '@/api/auth';

const emit = defineEmits(['registerComplete']);

const formData = reactive<registerParam>({
  username: '',
  password: '',
  email: '',
  phone: '',
});
const repeatPwd = ref<string>('');

const rules = {
  username: [
    { required: true, message: '用户名必填', type: 'error', trigger: 'blur' },
    { min: 6, message: '输入字数应在6到15之间', type: 'error', trigger: 'blur' },
    { max: 15, message: '输入字数应在6到15之间', type: 'error', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码必填', type: 'error', trigger: 'blur' },
    { min: 6, message: '输入字数应在6到20之间', type: 'error', trigger: 'blur' },
    { max: 20, message: '输入字数应在6到20之间', type: 'error', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱必填', type: 'error', trigger: 'blur' },
    { email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' },
  ],
  phone: [
    { required: true, message: '手机号必填', type: 'error', trigger: 'blur' },
    { telnumber: true, message: '请输入正确的手机号码' },
  ],
};

const onReset = () => {
  formData.username = '';
  formData.password = '';
  formData.email = '';
  formData.phone = '';
  repeatPwd.value = '';
};

const onSubmit = ({ validateResult }: SubmitContext) => {
  if (validateResult !== true) return;
  if (formData.password !== repeatPwd.value) {
    formData.password = '';
    repeatPwd.value = '';
    MessagePlugin.warning('两次输入密码不一致，请重新输入！');
    return;
  }
  register({
    username: formData.username,
    password: formData.password,
    email: formData.email,
    phone: formData.phone,
  }).then((res) => {
    if (res.data) {
      // 注册成功
      MessagePlugin.success('注册成功！');
      onReset();
      emit('registerComplete')
    } else {
      // 注册失败
      MessagePlugin.warning(res.message);
      emit('registerComplete')
    }
  });
};
</script>
