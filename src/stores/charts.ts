import { ref } from 'vue';
import { type Ref } from 'vue';
import { defineStore } from 'pinia';
import { get } from '@/utils/axios';
interface EChartData {
  title: {
    text: string;
    textStyle: {
      color: string;
    };
  };
  grid: {
    left: number;
    right: number;
    bottom: number;
    containLabel: boolean;
  };
  xAxis: {
    type: string;
    boundaryGap: boolean;
    data: string[];
  };
  yAxis: {
    type: string;
  };
  series: [
    {
      type: string;
      showSymbol: boolean;
      data: number[];
      itemStyle: { color: string };
      areaStyle: { color: string };
    },
  ];
}

export interface ChartModel {
  id: string;
  fullLabel: string;
  labelPrefix: string;
  labelSuffix: string;
  points: (number | string)[][];
  style: {
    lineColor: string;
    areaColor: string;
  };
  eChartData?: EChartData;
}

export const useChartsStore = defineStore('charts', () => {
  const charts: Ref<ChartModel[]> = ref([]);
  const fetchCharts = async () => {
    const { data } = await get('/api/mock-charts.json');
    charts.value = data.map((item: ChartModel) => {
      const dateList: string[] = [];
      const valueList: number[] = [];
      item.points.forEach(([date, value]) => {
        dateList.push(date as string);
        valueList.push(value as number);
      });
      return {
        ...item,
        eChartData: {
          title: {
            text: item.fullLabel,
            textStyle: {
              color: '#101828',
            },
          },
          grid: {
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateList,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'line',
              showSymbol: false,
              data: valueList,
              itemStyle: { color: item.style.lineColor },
              areaStyle: { color: item.style.areaColor },
            },
          ],
        },
      };
    });
  };
  return { charts, fetchCharts };
});
