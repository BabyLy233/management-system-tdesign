<template>
  <div id="page-cashier">
    <t-card>
      <span class="text-xl">商品录入</span>
      <t-input class="mb-3 mt-3" v-model="itemNo" placeholder="请输入商品编号或扫码输入" clearable @enter="addItem" />
      <t-button theme="primary" shape="round">
        <template #icon>
          <DownloadIcon />
        </template>
        添加
      </t-button>
      <t-divider />
      <t-table
        row-key="index"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="false"
        table-layout="auto"
        size="medium"
      />
      <t-divider />

      <t-row>
        <t-col :span="6" :offset="9">
          <div class="text-lg leading-10">
            <h2>价格总计</h2>
            <h2>会员价格</h2>
            <h2>数量总计</h2>
          </div>
          <t-input class="mb-3 mt-3" v-model="itemNo" placeholder="请输入会员手机号" clearable @enter="addItem" />
          <t-button class="ml-54" theme="primary">
            <template #icon>
              <EnterIcon />
            </template>
            结算
          </t-button>
        </t-col>
      </t-row>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DownloadIcon, EnterIcon } from 'tdesign-icons-vue-next';

const itemNo = ref<string>('');

const columns = [
  {
    width: '100',
    colKey: 'index',
    title: '序号',
    align: 'center',
    className: 'custom-column-class-name',
    attrs: {
      'data-id': 'first-column',
    },
  },
  {
    colKey: 'itemImg',
    title: '商品图',
  },
  {
    colKey: 'itemNo',
    title: '商品号',
  },
  {
    colKey: 'itemName',
    title: '商品名',
  },
  {
    colKey: 'itemNum',
    title: '商品数量',
  },
  {
    colKey: 'itemPrice',
    title: '商品单价',
  },
  {
    colKey: 'vipPrice',
    title: '会员价',
  },
  {
    colKey: 'operator',
    title: '操作',
  },
];

const data = [{}];

const addItem = () => {};
</script>

<style lang="scss">
@import './index.scss';
</style>
