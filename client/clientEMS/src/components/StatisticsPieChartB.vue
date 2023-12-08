<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController
} from 'chart.js';

import { Pie } from 'vue-chartjs';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PieController
);

export default {
    name: 'StatisticsPieChart',

    props: {
        chartData: {
            type: Object,
            default: () => { }
        },

        chartOptions: {
            type: Object,
            default: () => { }
        }
    },

    components: {
        Pie
    },

    data() {

        return {
            chartOptions: {
                layout: {
                    padding: {
                        bottom: 40,
                        top: 0,
                        left: 10,
                        right: 0
                    }
                },
            }
        }
    }
}
</script>


<template>
    <div style="width: 300px; height: 300px">
        <Pie style="width: 100%; height: 100%;" :data="chartData" :options="chartOptions" />
    </div>
</template>