<template>
  <div id="page-order">
    <t-card title="订单查询" header-bordered>
      <t-row class="mb-5" :gutter="50">
        <t-col :span="2">
          <span>订单流水号：</span>
          <t-input v-model="searchName" clearable />
        </t-col>
        <t-col :span="2">
          <span>订单状态：</span>
          <t-select v-model="orderStatus" :options="statusOption" placeholder="请选择商品状态" />
        </t-col>
        <t-col :span="1">
          <t-button class="mt-5" theme="primary" @click="search">
            <template #icon>
              <SearchIcon />
            </template>
            搜索
          </t-button>
        </t-col>
      </t-row>
      <t-table
        row-key="id"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="true"
        table-layout="auto"
      >
        <template #cprice="{ row }">
          <span>{{ row.cprice }} ￥</span>
        </template>
        <template #orderStatus="{ row }">
          <t-tag shape="round" theme="default" size="large" v-if="row.orderStatus === 0">待付款</t-tag>
          <t-tag shape="round" theme="primary" size="large" v-if="row.orderStatus === 1">已付款</t-tag>
          <t-tag shape="round" theme="warning" size="large" v-if="row.orderStatus === 2">待发货</t-tag>
          <t-tag shape="round" theme="danger" size="large" v-if="row.orderStatus === 3">待签收</t-tag>
          <t-tag shape="round" theme="success" size="large" v-if="row.orderStatus === 4">已签收</t-tag>
          <t-tag shape="round" theme="default" size="large" v-if="row.orderStatus === 5">已取消</t-tag>
        </template>
        <template #createTime="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #operator="{ row }">
          <t-button variant="text" theme="primary">
            <template #icon>
              <BulletpointIcon />
            </template>
            查看详情
          </t-button>
          <t-button variant="text" theme="danger" v-if="row.orderStatus === 2">
            <template #icon>
              <NotificationIcon />
            </template>
            发货
          </t-button>
          <t-button variant="text" theme="warning" v-if="row.orderStatus === 0 || row.orderStatus === 2">
            <template #icon>
              <CloseIcon />
            </template>
            关闭订单
          </t-button>
        </template>
      </t-table>
      <t-pagination v-model="current" v-model:pageSize="pageSize" :total="totalNum" @change="onChange" />
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BulletpointIcon, CloseIcon, NotificationIcon, SearchIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getOrderByPage } from '@/api/order';
import type { orderData } from '@/interfaces';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const orderStatus = ref<number>(6);
const searchName = ref<string>('');
const data = ref<Array<orderData>>([]);

const statusOption = [
  { label: '所有状态', value: 6 },
  { label: '待付款', value: 0 },
  { label: '已付款', value: 1 },
  { label: '待发货', value: 2 },
  { label: '待签收', value: 3 },
  { label: '已签收', value: 4 },
  { label: '已取消', value: 5 },
];

const fetchData = (p: number = 5, c: number = 1) => {
  if (c === 1 || p === 5) {
    current.value = 1;
    pageSize.value = 5;
  }
  getOrderByPage({
    numEachPage: p,
    currentPage: c,
    orderStatus: orderStatus.value,
    orderId: searchName.value,
  }).then((res) => {
    data.value = res.data.record;
    totalNum.value = res.data.totalSum;
  });
};

const onChange = (pageInfo: any) => {
  fetchData(pageInfo.pageSize, pageInfo.current);
};

const search = () => {
  fetchData();
};

onMounted(() => {
  fetchData();
});

const columns = [
  {
    colKey: 'id',
    title: '订单ID',
    align: 'center',
  },
  {
    colKey: 'orderId',
    title: '订单流水号',
    align: 'center',
  },
  {
    colKey: 'userId',
    title: '订单用户ID',
    align: 'center',
  },
  {
    colKey: 'cprice',
    title: '订单总价',
    align: 'center',
  },
  {
    colKey: 'orderStatus',
    title: '订单状态',
    align: 'center',
    width: 80,
  },
  {
    colKey: 'createTime',
    title: '订单创建日期',
    align: 'center',
  },
  {
    colKey: 'operator',
    title: '操作',
    align: 'center',
  },
];
</script>

<style lang="scss">
@import './index.scss';
</style>
