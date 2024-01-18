<script>
import { formatDate } from '../helpers/dateFormatter';
import { formatToRupiah } from '../helpers/rupiahFormatter';

export default {
  props: ['index', 'employee'],
  computed: {
    formatDate
  },
  methods: {
    editEmployee() {
      this.$emit('editEmployee', this.employee.id);
      console.log(this.employee.id);
    },
    updateEmployeeStatus(employee) {
      this.$emit('update-employee-status', employee);
    },
    showModal() {
      this.$emit('show-modal', this.employee) 
    },
    deleteEmployeeById() {            
      console.log('Delete Employee button clicked', this.employee.id);
      this.$emit('delete-employee', this.employee.id)
    },
  },
  computed: {
    formattedStartContractDate() {
      return formatDate(this.employee.startContractDate);
    },
    formattedEndContractDate() {
      return formatDate(this.employee.endContractDate);
    },
    formattedSalary() {
        return formatToRupiah(this.employee.salary);
    }
  }
};
</script>

<template>
  <tr>
    <td id="td-row">{{index + 1}}</td>
    <td id="td-row" @click="showModal" style="cursor: pointer;">
      {{employee.fullName}} 
    </td>
    <td id="td-row">{{employee.email}}</td>
    <td id="td-row">{{employee.Branch.name}}</td>
    <td id="td-row">{{employee.Position.name}}</td>
    <td id="td-row">{{ formattedStartContractDate }}</td>
    <td id="td-row">{{ formattedEndContractDate }}</td>
    <td id="td-row">{{ formattedSalary }}</td>
    <td id="td-row" style="text-align: center;">{{employee.employmentStatus}}</td>
    <td id="td-row">
      <select v-model="employee.employeeStatus" @change="updateEmployeeStatus(employee)">
      <option value="null">Select Status</option>
      <option value="Resigned/Fired">Resigned/Fired</option>
      <option value="Active" :disabled="employee.employeeStatus === 'Active'">Active</option>
      <option value="Warning" :disabled="employee.employeeStatus === 'Warning'">Warning</option>
    </select>
    </td>
    <td id="td-row"><button class="edit-button" @click="editEmployee">✏️</button></td>
    <td id="td-row"><button class="delete-button-2" @click="deleteEmployeeById(employee.id)">⋮</button></td>
  </tr>
</template>

<style>
tr:hover {
  background-color: rgba(178, 173, 173, 0.8); /* Warna latar belakang saat hover */
  transition: background-color 0.5s ease; /* Efek transisi saat mengganti warna latar belakang */
}
</style>