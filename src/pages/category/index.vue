<template>
  <div id="page-category">
    <t-card title="分类管理" header-bordered>
      <t-table
        row-key="id"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="true"
        table-layout="auto"
      >
        <template #status="{ row }">
          <t-tag theme="success" size="large" v-if="row.isHidden === 0">正常</t-tag>
          <t-tag theme="warning" size="large" v-else>隐藏</t-tag>
        </template>
        <template #formatCTime="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #formatUTime="{ row }">
          {{ dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #operator="{ row }">
          <t-button variant="outline" @click="showEdit(row)">
            <template #icon>
              <EditIcon />
            </template>
            编辑
          </t-button>
          <t-button class="ml-3" theme="danger" variant="outline">
            <template #icon>
              <DeleteIcon />
            </template>
            删除
          </t-button>
        </template>
      </t-table>
      <t-pagination v-model="current" v-model:pageSize="pageSize" :total="totalNum" @change="onChange" />
    </t-card>
    <EditDrawer ref="editDrawer" :categoryInfo="choosedCate" @edit-success="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EditIcon, DeleteIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getCategoryByPage } from '@/api/category';
import type { BaseTableCol } from 'tdesign-vue-next';
import type { categoryData } from '@/interfaces';
import EditDrawer from './components/EditDrawer.vue';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const data = ref<Array<categoryData>>([]);

const choosedCate = ref();
const editDrawer = ref(null);

const showEdit = (rowInfo: categoryData) => {
  // @ts-ignore
  editDrawer.value.visible = true;
  choosedCate.value = rowInfo;
};

const fetchData = (pageSize: number = 5, current: number = 1) => {
  getCategoryByPage({
    numEachPage: pageSize,
    currentPage: current,
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

const columns: Array<BaseTableCol<categoryData>> = [
  {
    colKey: 'id',
    title: 'ID',
  },
  {
    colKey: 'categoryName',
    title: '分类名称',
  },
  {
    colKey: 'categoryLevel',
    title: '分类层级',
  },
  {
    colKey: 'parentId',
    title: '父级分类ID',
  },
  {
    colKey: 'isHidden',
    title: '状态',
    cell: 'status',
    width: 70,
  },
  {
    colKey: 'createTime',
    title: '创建时间',
    cell: 'formatCTime',
  },
  {
    colKey: 'updateTime',
    title: '更新时间',
    cell: 'formatUTime',
  },
  {
    title: '操作',
    cell: 'operator',
    width: 230,
  },
];
</script>

<style lang="scss">
@import './index.scss';
</style>
