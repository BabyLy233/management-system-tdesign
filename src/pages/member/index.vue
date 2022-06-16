<template>
  <div id="page-member">
    <t-card title="会员信息" header-bordered>
      <t-popup>
        <template #content>
          <img src="@/assets/qrcode.jpg" alt="qrcode" />
        </template>
        <t-button class="mb-5" theme="primary">
          <template #icon>
            <QrcodeIcon />
          </template>
          注册会员
        </t-button>
      </t-popup>
      <t-table
        row-key="id"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="true"
        table-layout="auto"
      >
        <template #avatarUrl="{ row }">
          <img class="avatar" :src="row.avatarUrl" alt="avatar" />
        </template>
        <template #status>
          <t-tag shape="round" theme="success" size="large">正常</t-tag>
        </template>
        <template #createTime="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #operator="{ row }">
          <t-button theme="danger" variant="outline">
            <template #icon>
              <UserClearIcon />
            </template>
            封禁
          </t-button>
        </template>
      </t-table>
      <t-pagination v-model="current" v-model:pageSize="pageSize" :total="totalNum" @change="onChange" />
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UserClearIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getMemberByPage } from '@/api/member';
import type { memberData } from '@/interfaces';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const data = ref<Array<memberData>>([]);

const fetchData = (p: number = 5, c: number = 1) => {
  if (c === 1 || p === 5) {
    current.value = 1;
    pageSize.value = 5;
  }
  getMemberByPage({
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
    title: '会员ID',
    align: 'center',
  },
  {
    colKey: 'avatarUrl',
    title: '会员头像',
    align: 'center',
    width: 115,
  },
  {
    colKey: 'nickname',
    title: '会员昵称',
    align: 'center',
  },
  {
    colKey: 'phone',
    title: '会员手机号',
    align: 'center',
  },
  {
    colKey: 'status',
    title: '会员状态',
    align: 'center',
  },
  {
    colKey: 'createTime',
    title: '注册日期',
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
