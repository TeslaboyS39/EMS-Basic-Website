<script>
import StatisticsPieChartA from "../components/StatisticsPieChartA.vue";
import StatisticsPieChartB from "../components/StatisticsPieChartB.vue";

export default {
  props: ['employees', 'branches', 'positions', 'currentPage'],
  components: {
    StatisticsPieChartA,
    StatisticsPieChartB,
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
    totalFulltimeEmployees() {
      return this.employees.filter(employee => employee.employmentStatus === 'Full-time').length;
    },
    totalContractEmployees() {
      return this.employees.filter(employee => employee.employmentStatus === 'Contract').length;
    },
    totalProbationEmployees() {
      return this.employees.filter(employee => employee.employmentStatus === 'Probation').length;
    },
    totalInternshipEmployees() {
      return this.employees.filter(employee => employee.employmentStatus === 'Internship').length;
    },
    statisticsPieChartDataA() {
      return {
        labels: ['Active Employees', 'Warning Employees', 'Resigned/Fired Employees'],
        datasets: [{
          data: [this.totalActiveEmployees, this.totalWarningEmployees, this.totalResignOrFiredEmployees],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        }],
      };
    },
    statisticsPieChartOptionsA() {
      return {
        responsive: true,
        maintainAspectRatio: true,
      };
    },
    statisticsPieChartDataB() {
      return {
        labels: ['Contract', 'Full-time', 'Internship', 'Probation'],
        datasets: [{
          data: [this.totalFulltimeEmployees, this.totalContractEmployees, this.totalProbationEmployees, this.totalInternshipEmployees],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#EB7F36'],
        }],
      };
    },
    statisticsPieChartOptionsB() {
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
      <div class="outer-section">
        <div class="dashboard-section pb-3">
          <h2>Dashboard</h2>
          <hr>
          <div class="dashboard-info">
            <div class="dashboard-item">
              <h3>Total Employees</h3>
              <p>{{ totalActiveEmployees }}</p>
            </div>
            <div class="dashboard-item">
              <h3>Total Branches</h3>
              <p>{{ branches.length }}</p>
            </div>
            <div class="dashboard-item">
              <h3>Total Positions</h3>
              <p>{{ positions.length }}</p>
            </div>
          </div>
          <h2 class="mt-2">Statistics</h2>
          <hr>
          <div class="dashboard-item mt-3 bg-white" style="width: 620px; height: 280px; display: flex; justify-content: center;">
            <StatisticsPieChartA :chartData="statisticsPieChartDataA" :chartOptions="statisticsPieChartOptionsB" />
            <StatisticsPieChartB :chartData="statisticsPieChartDataB" :chartOptions="statisticsPieChartOptionsB" />
          </div>
        </div>
      </div>
    </section>
  </template>
