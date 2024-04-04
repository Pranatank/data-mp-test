<template>
  <q-select
    class="lt-md"
    standout="bg-transparent"
    bg-color="transparent"
    v-model="selectModel"
    :options="chartsStore.charts"
    borderless
    label-slot
  >
    <template #selected-item>
      {{ selectModel?.labelPrefix }}&nbsp;
      <span class="text-purple-3">{{ selectModel?.labelSuffix }}</span>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.fullLabel }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
  <div class="charts">
    <div class="chart-wrap" v-for="chart in chartsStore.charts" :key="chart.id">
      <div class="chart-inner" :ref="`chart-${chart.id}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, ref } from 'vue';
import type { Ref } from 'vue';
import type { ComponentInternalInstance } from 'vue';
import * as echarts from 'echarts';
import { useChartsStore } from '@/stores/charts';
import type { ChartModel } from '@/stores/charts';

const instance: ComponentInternalInstance | null = getCurrentInstance();

const chartsStore = useChartsStore();
const eChartsList: HTMLDivElement[] = [];
const resizeAllCharts = () => eChartsList.forEach((chart: any) => chart.resize());

const selectModel: Ref<ChartModel | null> = ref(null);

chartsStore.fetchCharts().then(async () => {
  if (instance) {
    chartsStore.charts.forEach((item: ChartModel) => {
      const ref = instance.refs[`chart-${item.id}`] as object[] | undefined;
      if (Array.isArray(ref)) {
        const chart = ref[0] as HTMLDivElement | undefined;
        if (chart) {
          const eChartsItem = echarts.init(chart);
          eChartsItem.setOption(item.eChartData as any);
          eChartsList.push(eChartsItem as any);
        }
      }
    });
    window.addEventListener('resize', resizeAllCharts);
    selectModel.value = chartsStore.charts[0];
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeAllCharts);
});
</script>

<style scoped lang="scss">
.charts {
  display: flex;
  margin-top: 24px;
  gap: 24px;
  align-items: stretch;
  .chart-wrap {
    flex: 1;
    max-width: calc(50% - 12px);
    height: 440px;
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    .chart-inner {
      align-self: stretch;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
