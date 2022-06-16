<template>
  <div>
    <t-drawer v-model:visible="visible" header="订单详情" size="large" :on-confirm="onClickConfirm" :close-btn="true">
      <t-list :split="true">
        <t-list-item v-for="item in orderItem">
          <t-list-item-meta
            :title="item.goodName"
            :description="'数量:' + item.goodNum + ' 价格:' + item.c_price + '￥'"
          />
        </t-list-item>
      </t-list>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue';

const visible = ref<boolean>(false);

defineExpose({
  visible,
});

const props = defineProps(['detailJson']);

const orderItem = ref();

onUpdated(() => {
  orderItem.value = JSON.parse(props.detailJson.orderItem).goodList;
});

const onClickConfirm = () => {
  visible.value = false;
};
</script>
