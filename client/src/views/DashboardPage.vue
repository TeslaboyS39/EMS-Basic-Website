<script>
import StatisticsPieChartA from "../components/StatisticsPieChartA.vue";
import StatisticsPieChartB from "../components/StatisticsPieChartB.vue";
import BarChart from "../components/BarChart.vue"

export default {
  props: ['employees', 'branches', 'positions', 'currentPage'],
  components: {
    StatisticsPieChartA,
    StatisticsPieChartB,
    BarChart
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
        layout: {
          padding: {
            bottom: 40,
            top: 0,
            left: 10,
            right: 0
          }
        }
      };
    },
    statisticsPieChartDataB() {
      return {
        labels: ['Contract', 'Full-time', 'Internship', 'Probation'],
        datasets: [{
          data: [this.totalFulltimeEmployees, this.totalContractEmployees, this.totalProbationEmployees, this.totalInternshipEmployees],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#EB7F36'],
        }]
      };
    },
    statisticsPieChartOptionsB() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            bottom: 40,
            top: 0,
            left: 10,
            right: 0
          }
        },
      };
    },
    topPerformers() {
      // Menyusun karyawan berdasarkan nilai KPI tertinggi
      const sortedEmployees = this.employees.slice().sort((a, b) => b.kpi - a.kpi);
      // Mengambil 3 karyawan pertama
      return sortedEmployees.slice(0, 3);
    },
    topPerformersB() {
      // Menyusun karyawan berdasarkan nilai KPI tertinggi
      const sortedEmployees = this.employees.slice().sort((a, b) => b.kpi - a.kpi);
      // Mengambil 3 karyawan pertama
      return sortedEmployees.slice(0, 10);
    },
    chartData() {
      const topPerformers = this.topPerformersB.slice(0, 10).sort((a, b) => b.kpi - a.kpi);

      return {
        labels: topPerformers.map(employee => employee.fullName),
        datasets: [
          {
            label: 'KPI (%)',
            data: topPerformers.map((employee) => employee.kpi),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      };
    },
  }
}
</script>

<template>
  <section v-if="currentPage === 'dashboard'" id="dashboard-section">
    <div class="outer-section">
      <div class="dashboard-section">
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
        <div class="dashboard-item mt-3 bg-white"
          style="width: 620px; height: 280px; display: flex; justify-content: center;">
          <StatisticsPieChartA :chartData="statisticsPieChartDataA" :chartOptions="statisticsPieChartOptionsA" />
          <StatisticsPieChartB :chartData="statisticsPieChartDataB" :chartOptions="statisticsPieChartOptionsB" />
        </div>
      </div>
      <div class="dashboard-section-b">
        <h2>Top Performance</h2>
        <hr>
        <div v-for="(performer, index) in topPerformers" :key="index" class="top-performer">
          <div class="rank">#{{ index + 1 }}</div>
          <div class="photo-container">
            <img :src="performer.photo" class="employee-photo" alt="Employee Photo" />
          </div>
          <div class="info">
            <h3>{{ performer.fullName }}</h3>
            <h5>KPI: {{ performer.kpi }}</h5>
          </div>
        </div>
        <hr>
        <div class="dashboard-item mt-3 bg-white">
          <BarChart 
            :data="chartData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.dashboard-section-b .top-performer {
  display: flex;
  background-color: #5171c2; /* Warna latar belakang biru */
  color: #0e0e0e; /* Warna teks hitam */
  padding: 10px; /* Padding tambahan untuk meningkatkan kenyamanan tampilan */
  border-radius: 8px; /* Sudut elemen yang melengkung */
  margin-bottom: 7px; /* Jarak antar elemen Top Performers */
}

.dashboard-section-b .top-performer .rank {
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px; /* Jarak antara indeks dan informasi lainnya */
}

.dashboard-section-b .top-performer .info {
  flex-grow: 1; /* Memungkinkan elemen info untuk mengisi ruang yang tersedia */
}

.dashboard-section-b .top-performer h3 {
  font-size: 17px;
  margin-bottom: 5px; /* Jarak antara judul dan nilai KPI */
}

.dashboard-section-b .top-performer h5 {
  font-size: 17px;
  font-weight: normal;
  margin: 0; /* Hilangkan margin bawaan untuk elemen h5 */
}

.dashboard-section-b .top-performer .photo-container {
  width: 40px; /* Sesuaikan dengan lebar foto yang diinginkan */
  height: 40px; /* Sesuaikan dengan tinggi foto yang diinginkan */
  overflow: hidden;
  border-radius: 50%; /* Untuk membuat foto lingkaran */
}

.dashboard-section-b .top-performer .employee-photo {
  width: 100%;
  height: 100%; /* Mengisi seluruh dimensi kontainer */
  object-fit: cover; /* Objek pemotongan untuk memastikan foto tetap sesuai dengan aspek rasio kontainer */
  border-radius: 50%;
}
</style>
