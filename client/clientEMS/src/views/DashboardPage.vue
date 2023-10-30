<script>
export default {
  props: ['employees', 'branches', 'positions', 'currentPage'],
  computed: {
    totalActiveEmployees() {
        return this.employees.filter(employee => employee.employeeStatus !== 'Resigned/Fired').length;
    }
  }
};
</script>

<template>
    <section v-if="currentPage === 'dashboard'" id="dashboard-section">
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
        </div>
    </section>
</template>