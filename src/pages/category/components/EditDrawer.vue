<template>
  <div>
    <t-drawer v-model:visible="visible" header="分类编辑" :on-confirm="handleConfirm" @close="handleClose">
      <t-form ref="form" :data="formData" :colon="true" :rules="rules">
        <t-form-item label="分类ID" name="id">
          <t-input v-model="formData.id" disabled />
        </t-form-item>
        <t-form-item label="分类名称" name="name">
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
import { ref, reactive, onUpdated } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { categoryData } from '@/interfaces';
import { editCategory } from '@/api/category';

interface editCategory {
  id?: number;
  categoryName?: string;
  imgUrl?: string;
  categoryLevel?: number;
  parentId?: number;
  isHidden?: boolean;
}

const emit = defineEmits(['editSuccess']);
const form = ref(null);
const props = defineProps(['categoryInfo']);
const formData = reactive<editCategory>({
  id: 0,
  categoryName: '',
  imgUrl: '',
  categoryLevel: 0,
  parentId: 0,
  isHidden: false,
});

const rules = {
  name: [{ required: true, message: '请填写分类名称', type: 'error', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请填写分类图片地址', type: 'error', trigger: 'blur' }],
};

onUpdated(() => {
  const categoryInfo: categoryData = props.categoryInfo;
  formData.id = categoryInfo.id;
  formData.categoryName = categoryInfo.categoryName;
  formData.imgUrl = categoryInfo.imgUrl;
  formData.categoryLevel = categoryInfo.categoryLevel;
  formData.parentId = categoryInfo.parentId;
  formData.isHidden = categoryInfo.isHidden === 0 ? true : false;
});

const visible = ref<boolean>(false);

defineExpose({
  visible,
});

const handleConfirm = () => {
  if (formData.categoryName === '' || formData.imgUrl === '') {
    return;
  }
  editCategory({
    id: formData.id,
    categoryName: formData.categoryName,
    imgUrl: formData.imgUrl,
    categoryLevel: formData.categoryLevel,
    parentId: formData.parentId,
    isHidden: formData.isHidden ? 0 : 1,
  }).then((res) => {
    console.log('%c [ res ]-87', 'font-size:13px; background:pink; color:#bf2c9f;', res);
    if (!res.data) {
      MessagePlugin.error('商品分类编辑失败！');
      return;
    }
    MessagePlugin.success('编辑成功！');
    visible.value = false;
    emit('editSuccess');
  });
};

const handleClose = () => {
  // @ts-ignore
  form.value.reset();
};
</script>
