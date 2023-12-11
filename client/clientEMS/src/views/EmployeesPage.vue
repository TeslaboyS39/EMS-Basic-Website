<script>
import TableRow from "../components/tablerow.vue";
import ReusableButton from "../components/ReusableButton.vue";
import Pagination from "../components/Pagination.vue";
import EmployeeModal from '../components/EmployeeModal.vue'

export default{
  props: ['currentPage', 'employees'],
  components: {
    TableRow,ReusableButton, Pagination, EmployeeModal
  },
  data() {
    return {
      currentPageNumber: 1,
      employeesPerPage: 7,
      search: '',
      isSearching: false,
      selectedEmployee: null,
      isModalVisible: false
    };
  },
  watch: {
    search() {
      this.isSearching = false;
    }
  },
  computed: {
    slicedEmployees() {
      const start = (this.currentPageNumber - 1) * this.employeesPerPage
      return this.employees.slice(start, start + this.employeesPerPage)
    },
    totalPages() {
      return Math.ceil(this.employees.length / this.employeesPerPage);
    },
    filteredEmployees() {
      if (!this.isSearching) {
        return this.slicedEmployees;
      }

      const results = [];

      this.employees.forEach((employee) => {
        if (employee.fullName.toLowerCase().includes(this.search)) {
          results.push(employee);
        } else if (employee.fullName.includes(this.search)) {
          results.push(employee);
        }
      });

      return results;
    },
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
      this.isSearching = false;
    },
    getRealIndex(indexOnPage) {
      return (this.currentPageNumber - 1) * this.employeesPerPage + indexOnPage;
    },
    searchEmployees() {
      this.isSearching = true;
    },   
    showModal(employee) {
      this.selectedEmployee = employee  
      this.isModalVisible = true
    } 
  }
};
</script>

<template>
  <section v-if="currentPage === 'showemployees'" id="showemployees-section">
    <div class="employee-collection">
      <div class="header-wrapper">
        <h2 style="color: azure;">Employees List</h2>
        <div class="search-wrapper">
          <input class="searchBar mb-3 rounded" type="text" v-model="search" placeholder="Find employee..." />
          <button class="btn btn-primary searchButton" @click="searchEmployees">Search</button>
        </div>
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
            <employee-modal 
              :employee="selectedEmployee"
              v-if="isModalVisible"
              @close="isModalVisible = false"
            />
          </thead>
          <tbody>
            <table-row
                v-for="(employee, index) in filteredEmployees"
                :key="employee.id"
                :index="getRealIndex(index)"
                :employee="employee"
                @editEmployee="editEmployee"
                @update-employee-status="updateEmployeeStatus"
                @show-modal="showModal" 
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

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-wrapper {
  display: flex;
  align-items: baseline;
}

.searchBar {
  margin-right: 8px; /* Atur margin agar input dan tombol tidak terlalu rapat */
  width: 35vh;
  height: 5.5vh;
}

</style>