<script>
import StatisticsChart from "../components/StatisticsChart.vue";

export default {
  props: ['employees', 'branches', 'positions', 'currentPage'],
  components: {
    StatisticsChart,
  },
  computed: {
    totalActiveEmployees() {
      return this.employees.filter(employee => employee.employeeStatus === 'Active').length;
    },
    totalWarningEmployees() {
      return this.employees.filter(employee => employee.employeeStatus === 'Warning').length;
    },
    totalResignOrFiredEmployees() {
      return this.employees.filter(employee => employee.employeeStatus === 'Resigned/Fired').length;
    },
    statisticsChartData() {
      return {
        labels: ['Active Employees', 'Warning Employees', 'Resigned/Fired Employees'],
        datasets: [{
          data: [this.totalActiveEmployees, this.totalWarningEmployees, this.totalResignOrFiredEmployees],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        }],
      };
    },
    statisticsChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
      };
    },
  },
};
</script>

<template>
    <section v-if="currentPage === 'dashboard'" id="dashboard-section">
        <div class="outer-section pb-1">
            <div class="dashboard-section">
            <h2>Dashboard</h2>
            <hr>
                <div class="dashboard-info">
                    <div class="dashboard-item">
                        <h3>Total Employees</h3>
                        <p>{{totalActiveEmployees}}</p>
                    </div>
                    <div class="dashboard-item">
                        <h3>Total Branches</h3>
                        <p>{{branches.length}}</p>
                    </div>
                    <div class="dashboard-item">
                        <h3>Total Positions</h3>
                        <p>{{positions.length}}</p>
                    </div>
                </div>
                <h2 class="mt-3">Statistics</h2>
                <hr>
                <div class="dashboard-item mt-4 bg-white" style="width: 350px; height: 300px">
                    <StatisticsChart
                        :chartData="statisticsChartData"
                        :chartOptions="statisticsChartOptions" 
                    />
                </div>
            </div>
        </div>
    </section>
</template>
