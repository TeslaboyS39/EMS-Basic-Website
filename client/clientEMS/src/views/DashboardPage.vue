<script>
export default {
  props: ['employees', 'branches', 'positions', 'currentPage'],
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
                    <p>{{employees.length}}</p>
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