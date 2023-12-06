<script>
import TableRow from "../components/TableRow.vue";
import ReusableButton from "../components/ReusableButton.vue";
import Pagination from "../components/Pagination.vue";

export default{
  props: ['currentPage', 'employees'],
  components: {
    TableRow,ReusableButton, Pagination
  },
  data() {
    return {
      currentPageNumber: 1,
      employeesPerPage: 7,
    };
  },
  computed: {
    slicedEmployees() {
      const start = (this.currentPageNumber - 1) * this.employeesPerPage;
      const end = start + this.employeesPerPage;
      return this.employees.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.employees.length / this.employeesPerPage);
    }
  },
  methods: {
    editEmployee(employeeId) {
        this.$emit('editEmployee', employeeId);
    },
    updateEmployeeStatus(employee) {
        this.$emit('update-employee-status', employee);
    },
    addEmployee() {
        this.$emit('addEmployee');
    },
    handlePageChange(page) {
      this.currentPageNumber = page;
    },
    getRealIndex(indexOnPage) {
      return (this.currentPageNumber - 1) * this.employeesPerPage + indexOnPage;
    }    
  }
};
</script>

<template>
  <section v-if="currentPage === 'showemployees'" id="showemployees-section">
    <div class="employee-collection">
      <div class="header-wrapper">
        <h2 style="color: azure;">Employees List</h2>
        <ReusableButton @click="addEmployee" text="Add Employee" type="button"/>
      </div>
      
      <table class="table">
          <thead>
            <tr>
              <th class="table-header">#</th>
              <th class="table-header">Full Name</th>
              <th class="table-header">Email</th>
              <th class="table-header">Branch</th>
              <th class="table-header">Position</th>
              <th class="table-header">Start Contract Date</th>
              <th class="table-header">End Contract Date</th>
              <th class="table-header">Salary</th>
              <th class="table-header">Employment Status</th>
              <th class="table-header">Status</th>
              <th class="table-header"></th>
            </tr>
          </thead>
          <tbody>
            <table-row
                v-for="(employee, index) in slicedEmployees"
                :key="employee.id"
                :index="getRealIndex(index)"
                :employee="employee"
                @editEmployee="editEmployee"
                @update-employee-status="updateEmployeeStatus"
            />
          </tbody>
      </table>
      <pagination
        :currentPage="currentPageNumber"
        :totalPages="totalPages"
        @pageChange="handlePageChange"
      />
    </div>
  </section>
</template>

<style>
.table-header {
  vertical-align: middle;
}

.table th {
  white-space: nowrap;  /* agar kontennya tidak memisahkan baris jika terlalu panjang */
}

</style>