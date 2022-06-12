<template>
  <div id="page-dashboard">
    <t-row :gutter="20">
      <t-col :span="3">
        <div>
          <t-card title="总收入（元）" hover-shadow>
            <p class="text-4xl">64,666.58</p>
            <p class="text-sm mt-2 text-gray-400">赚了多少米</p>
            <MoneyCircleIcon class="card-icon" />
          </t-card>
        </div>
      </t-col>
      <t-col :span="3">
        <div>
          <t-card title="总订单（个）" hover-shadow>
            <p class="text-4xl">450</p>
            <p class="text-sm mt-2 text-gray-400">有多少订单呀</p>
            <RootListIcon class="card-icon" />
          </t-card>
        </div>
      </t-col>
      <t-col :span="3">
        <div>
          <t-card title="总会员（位）" hover-shadow>
            <p class="text-4xl">888</p>
            <p class="text-sm mt-2 text-gray-400">有这么多老板</p>
            <UsergroupIcon class="card-icon" />
          </t-card>
        </div>
      </t-col>
      <t-col :span="3">
        <div>
          <t-card title="总浏览量（次）" hover-shadow>
            <p class="text-4xl">10001</p>
            <p class="text-sm mt-2 text-gray-400">好多人访问过</p>
            <ChartIcon class="card-icon" />
          </t-card>
        </div>
      </t-col>
    </t-row>
    <t-row>
      <t-col>
        <t-card class="mt-10" title="应用统计图表">
          <div id="below-chart"></div>
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { MoneyCircleIcon, RootListIcon, UsergroupIcon, ChartIcon } from 'tdesign-icons-vue-next';
import { useDashboardChart } from '@/hooks/useCharts';

onMounted(() => {
  const chartDIV = document.getElementById('below-chart') as HTMLDivElement;
  useDashboardChart(chartDIV);
});
</script>

<style lang="scss">
@import './index.scss';
</style>
