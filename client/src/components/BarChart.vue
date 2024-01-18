<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    options: {
      type: Object,
      default: () => { }
    },
  },
  components: {
    Bar
  }

}
</script>

<template>
  <div style="width: 400px; height: 200px">
    <bar :data="data" :options="options"></bar>
  </div>
</template>