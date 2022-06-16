<template>
  <div>
    <t-drawer
      v-model:visible="visible"
      header="添加分类"
      size="medium"
      :on-confirm="handleConfirm"
      @close="handleClose"
    >
      <t-form ref="form" :data="formData" :colon="true" :rules="rules">
        <t-form-item label="分类名称" name="categoryName">
          <t-input v-model="formData.categoryName" placeholder="请输入分类名称"></t-input>
        </t-form-item>
        <t-form-item label="分类图片" name="imgUrl">
          <t-input v-model="formData.imgUrl" placeholder="请输入分类图片地址"></t-input>
        </t-form-item>
        <t-form-item label="分类层级" name="categoryLevel">
          <t-input-number :min="1" :max="3" v-model="formData.categoryLevel" />
        </t-form-item>
        <t-form-item label="分类父级ID" name="parentId">
          <t-input-number :min="0" v-model="formData.parentId" />
        </t-form-item>
        <t-form-item label="状态" name="isHidden">
          <t-switch v-model="formData.isHidden" size="large" :label="['正常', '隐藏']" />
        </t-form-item>
      </t-form>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { addCategory } from '@/api/category';

const emit = defineEmits(['addSuccess']);

const form = ref(null);
const visible = ref<boolean>(false);

interface addCategory {
  categoryName?: string;
  imgUrl?: string;
  categoryLevel?: number;
  parentId?: number;
  isHidden?: boolean;
}

const formData = reactive<addCategory>({
  categoryName: '',
  imgUrl: '',
  categoryLevel: 1,
  parentId: 0,
  isHidden: true,
});

const rules = {
  categoryName: [{ required: true, message: '请填写分类名称', type: 'error', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请填写分类图片地址', type: 'error', trigger: 'blur' }],
};

defineExpose({
  visible,
});

const handleConfirm = () => {
  if (formData.categoryName === '' || formData.imgUrl === '') {
    return;
  }
  addCategory({
    categoryName: formData.categoryName,
    imgUrl: formData.imgUrl,
    categoryLevel: formData.categoryLevel,
    parentId: formData.parentId,
    isHidden: formData.isHidden ? 0 : 1,
  }).then((res) => {
    if (!res.data) {
      MessagePlugin.error('商品分类添加失败！');
      return;
    }
    MessagePlugin.success('添加成功！');
    visible.value = false;
    handleClose();
    emit('addSuccess');
  });
};

const handleClose = () => {
  // @ts-ignore
  form.value.reset();
  formData.categoryName = '';
  formData.imgUrl = '';
  formData.categoryLevel = 1;
  formData.parentId = 0;
  formData.isHidden = true;
};
</script>
