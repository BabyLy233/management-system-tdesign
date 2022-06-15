<template>
  <div>
    <t-drawer v-model:visible="visible" header="商品编辑" size="large" :on-confirm="handleConfirm" @close="handleClose">
      <t-form ref="form" :data="formData" :colon="true" :rules="rules">
        <t-form-item label="商品ID" name="id">
          <t-input v-model="formData.id" disabled />
        </t-form-item>
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
import { ref, reactive, onUpdated } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { goodData } from '@/interfaces';
import { editGood } from '@/api/good';

interface editGood {
  id?: number;
  goodName?: string;
  imgUrl?: string;
  goodCategory?: number;
  goodStock?: number;
  isHidden?: boolean;
  oprice?: number;
  cprice?: number;
}

const form = ref(null);
const emit = defineEmits(['editSuccess']);
const props = defineProps(['goodInfo']);
const formData = reactive<editGood>({
  id: 0,
  goodName: '',
  imgUrl: '',
  goodCategory: 0,
  goodStock: 0,
  oprice: 0,
  cprice: 0,
  isHidden: false,
});

const rules = {
  goodName: [{ required: true, message: '请填写商品名称', type: 'error', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请填写商品图片地址', type: 'error', trigger: 'blur' }],
};

onUpdated(() => {
  const goodInfo: goodData = props.goodInfo;
  formData.id = goodInfo.id;
  formData.goodName = goodInfo.goodName;
  formData.imgUrl = goodInfo.imgUrl;
  formData.goodCategory = goodInfo.goodCategory;
  formData.goodStock = goodInfo.goodStock;
  formData.oprice = goodInfo.oprice;
  formData.cprice = goodInfo.cprice;
  formData.isHidden = goodInfo.isHidden === 0 ? true : false;
});

const visible = ref<boolean>(false);

defineExpose({
  visible,
});

const handleConfirm = () => {
  if (formData.goodName === '' || formData.imgUrl === '') {
    return;
  }
  editGood({
    id: formData.id,
    goodName: formData.goodName,
    imgUrl: formData.imgUrl,
    goodCategory: formData.goodCategory,
    goodStock: formData.goodStock,
    oprice: formData.oprice,
    cprice: formData.cprice,
    isHidden: formData.isHidden ? 0 : 1,
  }).then((res) => {
    if (!res.data) {
      MessagePlugin.error('商品信息编辑失败！');
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
