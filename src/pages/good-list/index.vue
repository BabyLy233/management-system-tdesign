<template>
  <div id="page-good-list">
    <t-card title="商品管理" header-bordered>
      <t-row class="mb-5" :gutter="50">
        <t-col :span="2">
          <span>商品名称：</span>
          <t-input v-model="searchName" clearable />
        </t-col>
        <t-col :span="2">
          <span>商品状态：</span>
          <t-select v-model="goodStatus" :options="statusOption" placeholder="请选择商品状态" />
        </t-col>
        <t-col :span="1">
          <t-button class="mt-5" theme="primary" @click="search">
            <template #icon>
              <SearchIcon />
            </template>
            搜索
          </t-button>
        </t-col>
        <t-col :span="1">
          <t-button class="mt-5" theme="primary" @click="showAdd">
            <template #icon>
              <AddIcon />
            </template>
            添加商品
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
        <template #goodImg="{ row }">
          <img class="good-img" :src="row.imgUrl" alt="商品图片" />
        </template>
        <template #status="{ row }">
          <t-tag theme="success" size="large" v-if="row.isHidden === 0">已上架</t-tag>
          <t-tag theme="danger" size="large" v-else>已下架</t-tag>
        </template>
        <template #oprice="{ row }">
          <span>{{ row.oprice }} ￥</span>
        </template>
        <template #cprice="{ row }">
          <span>{{ row.cprice }} ￥</span>
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
    <EditDrawer ref="editDrawer" :goodInfo="choosedGood" @edit-success="fetchData" />
    <AddDrawer ref="addDrawer" @add-success="fetchData" />
    <t-dialog
      v-model:visible="delConfirm"
      theme="warning"
      header="警告"
      body="您确定要删除该商品吗？"
      :closeBtn="false"
      placement="center"
      @confirm="onClickConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';
import { getGoodsByPage, delGood } from '@/api/good';
import type { goodData } from '@/interfaces';
import EditDrawer from './components/EditDrawer.vue';
import AddDrawer from './components/AddDrawer.vue';

const current = ref<number>(1);
const pageSize = ref<number>(5);
const totalNum = ref<number>(0);
const data = ref<Array<goodData>>([]);
const goodStatus = ref<number>(-1);
const searchName = ref<string>('');
const choosedGood = ref();
const delConfirm = ref<boolean>(false);
const delId = ref<number>(0);

const editDrawer = ref(null);
const addDrawer = ref(null);

const statusOption = [
  { label: '已上架/已下架', value: -1 },
  { label: '已上架', value: 0 },
  { label: '已下架', value: 1 },
];

const onClickConfirm = () => {
  delGood(delId.value).then((res) => {
    if (!res.data) {
      MessagePlugin.error('商品删除失败！');
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

const showEdit = (rowInfo: goodData) => {
  // @ts-ignore
  editDrawer.value.visible = true;
  choosedGood.value = rowInfo;
};

const showAdd = () => {
  // @ts-ignore
  addDrawer.value.visible = true;
};

const fetchData = (p: number = 5, c: number = 1) => {
  if (c === 1 || p === 5) {
    current.value = 1;
    pageSize.value = 5;
  }
  getGoodsByPage({
    numEachPage: p,
    currentPage: c,
    goodName: searchName.value === '' ? undefined : searchName.value,
    status: goodStatus.value === -1 ? undefined : goodStatus.value,
  }).then((res) => {
    data.value = res.data.record;
    totalNum.value = res.data.totalSum;
  });
};

onMounted(() => {
  fetchData();
});

const search = () => {
  fetchData();
};

const onChange = (pageInfo: any) => {
  fetchData(pageInfo.pageSize, pageInfo.current);
};

const columns = [
  {
    colKey: 'id',
    title: '商品ID',
    align: 'center',
  },
  {
    colKey: 'imgUrl',
    title: '商品图片',
    cell: 'goodImg',
    width: 150,
    align: 'center',
  },
  {
    colKey: 'goodName',
    title: '商品名称',
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
    colKey: 'goodStock',
    title: '商品库存（件）',
    align: 'center',
  },
  {
    colKey: 'oprice',
    title: '商品原价',
    cell: 'oprice',
    align: 'center',
    width: 120,
  },
  {
    colKey: 'cprice',
    title: '商品现价',
    cell: 'cprice',
    align: 'center',
    width: 120,
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
