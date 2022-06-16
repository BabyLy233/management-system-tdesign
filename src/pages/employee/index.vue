<template>
  <div id="page-employee">
    <t-card title="员工信息" header-bordered>
      <t-table
        row-key="id"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="true"
        table-layout="auto"
      >
        <template #avatar>
          <img class="avatar" :src="`https://pic.imgdb.cn/api/avatar?unix=${Math.random()}`" alt="avatar" />
        </template>
        <template #userLevel="{ row }">
          <t-tag shape="round" theme="danger" size="large" v-if="row.id === 1">董事长</t-tag>
          <t-tag shape="round" theme="success" size="large" v-else-if="row.id === 2">项目经理</t-tag>
          <t-tag shape="round" theme="primary" size="large" v-else>打工人</t-tag>
        </template>
        <template #createTime="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #operator="{ row }">
          <t-button theme="danger" variant="outline">
            <template #icon>
              <UserClearIcon />
            </template>
            开除
          </t-button>
        </template>
      </t-table>
      <t-pagination v-model="current" v-model:pageSize="pageSize" :total="totalNum" @change="onChange" />
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserClearIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getEmployeeByPage } from '@/api/employee';
import type { employeeData } from '@/interfaces';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const data = ref<Array<employeeData>>([]);

const fetchData = (p: number = 5, c: number = 1) => {
  if (c === 1 || p === 5) {
    current.value = 1;
    pageSize.value = 5;
  }
  getEmployeeByPage({
    numEachPage: p,
    currentPage: c,
  }).then((res) => {
    data.value = res.data.record;
    totalNum.value = res.data.totalSum;
  });
};

const onChange = (pageInfo: any) => {
  fetchData(pageInfo.pageSize, pageInfo.current);
};

onMounted(() => {
  fetchData();
});

const columns = [
  {
    colKey: 'id',
    title: '员工ID',
    align: 'center',
  },
  {
    colKey: 'avatar',
    title: '员工头像（随机）',
    align: 'center',
    width: 115,
  },
  {
    colKey: 'username',
    title: '员工用户名',
    align: 'center',
  },
  {
    colKey: 'userLevel',
    title: '员工身份',
    align: 'center',
  },
  {
    colKey: 'phone',
    title: '员工手机号',
    align: 'center',
  },
  {
    colKey: 'email',
    title: '员工邮箱',
    align: 'center',
  },
  {
    colKey: 'createTime',
    title: '入职日期',
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
