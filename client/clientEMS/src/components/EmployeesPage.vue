<script>
import TableRow from "./TableRow.vue";
import ReusableButton from "./ReusableButton.vue";

export default{
  props: ['currentPage', 'employees'],
  components: {
    TableRow,ReusableButton
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
    }    
  }
};
</script>

<template>
  <section v-if="currentPage === 'showemployees'" id="showemployees-section">
    <div class="employee-collection">
      <h2>Employees Collection</h2>
      <ReusableButton @click="addEmployee" text="Add Employee" type="button"/>
      
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
              <th class="table-header">Status</th>
              <th class="table-header"></th>
            </tr>
          </thead>
          <tbody>
            <table-row
                v-for="(employee, index) in employees"
                :key="employee.id"
                :index="index"
                :employee="employee"
                @editEmployee="editEmployee"
                @update-employee-status="updateEmployeeStatus"
            />
          </tbody>
      </table>
    </div>
  </section>
</template>