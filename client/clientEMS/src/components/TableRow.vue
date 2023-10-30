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
    }
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
    <td id="td-row">{{employee.fullName}}</td>
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
  </tr>
</template>

<style>
#td-row{
  background-color: rgba(174, 172, 172, 0.8);
}
</style>