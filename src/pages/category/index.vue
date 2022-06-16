<template>
  <div id="page-category">
    <t-card title="分类管理" header-bordered>
      <t-button class="mb-4" theme="primary" @click="showAdd">
        <template #icon>
          <AddIcon />
        </template>
        添加分类
      </t-button>
      <t-table
        row-key="id"
        :data="data"
        :columns="columns"
        :stripe="false"
        :bordered="true"
        :hover="true"
        table-layout="auto"
      >
        <template #cateImg="{ row }">
          <img class="cate-img" :src="row.imgUrl" alt="商品分类图片" />
        </template>
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
          <t-button class="ml-3" theme="danger" variant="outline" @click="showDel(row.id)">
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
    <AddDrawer ref="addDrawer" @add-success="fetchData" />
    <t-dialog
      v-model:visible="delConfirm"
      theme="warning"
      header="警告"
      body="您确定要删除该分类吗？"
      :closeBtn="false"
      placement="center"
      @confirm="onClickConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { EditIcon, DeleteIcon, AddIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getCategoryByPage, delCategory } from '@/api/category';
import type { BaseTableCol } from 'tdesign-vue-next';
import type { categoryData } from '@/interfaces';
import EditDrawer from './components/EditDrawer.vue';
import AddDrawer from './components/AddDrawer.vue';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const data = ref<Array<categoryData>>([]);

const delConfirm = ref<boolean>(false);
const delId = ref<number>(0);

const choosedCate = ref();
const editDrawer = ref(null);
const addDrawer = ref(null);

const onClickConfirm = () => {
  delCategory(delId.value).then((res) => {
    if (!res.data) {
      MessagePlugin.error('商品分类删除失败！');
      return;
    }
    MessagePlugin.success('删除成功！');
    fetchData();
    delConfirm.value = false;
  });
};

const showDel = (id: number) => {
  delId.value = id;
  delConfirm.value = true;
};

const showAdd = () => {
  // @ts-ignore
  addDrawer.value.visible = true;
};

const showEdit = (rowInfo: categoryData) => {
  // @ts-ignore
  editDrawer.value.visible = true;
  choosedCate.value = rowInfo;
};

const fetchData = (p: number = 5, c: number = 1) => {
  if (c === 1 || p === 5) {
    current.value = 1;
    pageSize.value = 5;
  }
  getCategoryByPage({
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

const columns: Array<BaseTableCol<categoryData>> = [
  {
    colKey: 'id',
    title: 'ID',
    align: 'center',
  },
  {
    colKey: 'imgUrl',
    title: '分类图片',
    cell: 'cateImg',
    width: 150,
    align: 'center',
  },
  {
    colKey: 'categoryName',
    title: '分类名称',
    align: 'center',
  },
  {
    colKey: 'categoryLevel',
    title: '分类层级',
    align: 'center',
  },
  {
    colKey: 'parentId',
    title: '父级分类ID',
    align: 'center',
  },
  {
    colKey: 'isHidden',
    title: '状态',
    cell: 'status',
    width: 70,
    align: 'center',
  },
  {
    colKey: 'createTime',
    title: '创建时间',
    cell: 'formatCTime',
    align: 'center',
  },
  {
    colKey: 'updateTime',
    title: '更新时间',
    cell: 'formatUTime',
    align: 'center',
  },
  {
    title: '操作',
    cell: 'operator',
    width: 230,
    align: 'center',
  },
];
</script>

<style lang="scss">
@import './index.scss';
</style>
