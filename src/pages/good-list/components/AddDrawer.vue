<template>
  <div>
    <t-drawer v-model:visible="visible" header="添加商品" size="large" :on-confirm="handleConfirm" @close="handleClose">
      <t-form ref="form" :data="formData" :colon="true" :rules="rules">
        <t-form-item label="商品名称" name="goodName">
          <t-input v-model="formData.goodName" placeholder="请输入商品名称"></t-input>
        </t-form-item>
        <t-form-item label="商品图片" name="imgUrl">
          <t-input v-model="formData.imgUrl" placeholder="请输入商品图片地址"></t-input>
        </t-form-item>
        <t-form-item label="商品分类" name="goodCategory">
          <t-input-number :min="0" v-model="formData.goodCategory" />
        </t-form-item>
        <t-form-item label="商品库存" name="goodStock">
          <t-input-number :min="0" v-model="formData.goodStock" />
        </t-form-item>
        <t-form-item label="商品原价" name="oprice">
          <t-input-number size="large" :min="0" v-model="formData.oprice" :decimalPlaces="2" />
        </t-form-item>
        <t-form-item label="商品现价" name="cprice">
          <t-input-number size="large" :min="0" v-model="formData.cprice" :decimalPlaces="2" />
        </t-form-item>
        <t-form-item label="状态" name="isHidden">
          <t-switch v-model="formData.isHidden" size="large" :label="['上架', '下架']" />
        </t-form-item>
      </t-form>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { addGood } from '@/api/good';

const emit = defineEmits(['addSuccess']);

const form = ref(null);
const visible = ref<boolean>(false);

interface addGood {
  goodName?: string;
  imgUrl?: string;
  goodCategory?: number;
  goodStock?: number;
  isHidden?: boolean;
  oprice?: number;
  cprice?: number;
}

const formData = reactive<addGood>({
  goodName: '',
  imgUrl: '',
  goodCategory: 0,
  goodStock: 0,
  isHidden: false,
  oprice: 0,
  cprice: 0,
});

const rules = {
  goodName: [{ required: true, message: '请填写商品名称', type: 'error', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请填写商品图片地址', type: 'error', trigger: 'blur' }],
};

defineExpose({
  visible,
});

const handleConfirm = () => {
  if (formData.goodName === '' || formData.imgUrl === '') {
    return;
  }
  addGood({
    goodName: formData.goodName,
    imgUrl: formData.imgUrl,
    goodCategory: formData.goodCategory,
    goodStock: formData.goodStock,
    isHidden: formData.isHidden ? 0 : 1,
    oprice: formData.oprice,
    cprice: formData.cprice,
  }).then((res) => {
    if (!res.data) {
      MessagePlugin.error('商品添加失败！');
      return;
    }
    MessagePlugin.success('添加成功！');
    handleClose();
    visible.value = false;
    emit('addSuccess');
  });
};

const handleClose = () => {
  // @ts-ignore
  form.value.reset();
  formData.goodName = '';
  formData.imgUrl = '';
  formData.goodCategory = 0;
  formData.goodStock = 0;
  formData.oprice = 0;
  formData.cprice = 0;
  formData.isHidden = false;
};
</script>
