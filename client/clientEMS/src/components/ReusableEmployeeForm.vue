<script>
import ReusableButton from './ReusableButton.vue';

export default {
  props: ['branches', 'positions', 'currentPage', 'inputAddEmployee', 'fullName', 'buttonText'],
  emits: ['editEmployeeForm'],
  components: {
    ReusableButton
  },
  data() {
    return {
      inputEmployee: {
        fullName: '',
        email: '',
        BranchId: '',
        JobId: '',
        startContractDate: '',
        endContractDate: '',
      }
    };
  },
  methods: {
    handleInputEmployee() {
        if (this.currentPage === 'editemployee') {
          this.$emit('editEmployeeForm', this.inputEmployee);
        } else if (this.currentPage === 'addemployee'){
          this.$emit('addEmployeeForm', this.inputEmployee);          
        }
        // Buat ngirim event dgn data employee yg diisi sama pengguna
        console.log(this.inputEmployee);
    }
  },
  computed: {
    formatDate() {
      return 'yyyy-MM-dd'; 
    }
  },
  created() {
    if (this.currentPage === 'editemployee') {
      this.inputEmployee = this.inputAddEmployee;
      this.inputEmployee.startContractDate = new Date(this.inputEmployee.startContractDate).toISOString().split('T')[0];
      this.inputEmployee.endContractDate = new Date(this.inputEmployee.endContractDate).toISOString().split('T')[0];
    }
    console.log(this.inputEmployee, 'Punya si Reusable');
  }
};
</script>

<template>
  <section id="addemployee-section">
    <div class="add-employee-form">
      <h2>{{fullName}}</h2>
      <form @submit.prevent="handleInputEmployee">
        <label for="fullName">Full Name:</label>
        <input v-model="inputEmployee.fullName" type="text" id="fullName" name="fullName" />

        <label for="email">Email:</label>
        <input v-model="inputEmployee.email" type="text" id="email" name="email" />

        <label for="branch">Branch:</label>
        <select v-model="inputEmployee.BranchId" id="branch" name="branch" >
          <option value="" disabled selected>Select Branch</option>
          <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
        </select>

        <label for="position">Position:</label>
        <select v-model="inputEmployee.JobId" id="position" name="position" >
          <option value="" disabled selected>Select Position</option>
          <option v-for="position in positions" :key="position.id" :value="position.id">{{ position.name }}</option>
        </select>

        <div class="form-group">
          <label for="startContractDate">Start Contract Date:</label>
          <input v-model="inputEmployee.startContractDate" type="date" id="startContractDate" name="startContractDate" />
        </div>

        <div class="form-group">
          <label for="endContractDate">End Contract Date:</label>
          <input v-model="inputEmployee.endContractDate" type="date" id="endContractDate" name="endContractDate" />
        </div>

        <label for="salary">Salary (IDR):</label>
        <input v-model="inputEmployee.salary" type="number" id="salary" name="salary" />

        <label for="employmentStatus">Employment Status:</label>
        <input v-model="inputEmployee.employmentStatus" type="text" id="employmentStatus" name="employmentStatus" />
        
        <ReusableButton type="submit" :text="buttonText"/>
      </form>
    </div>
  </section>
</template>

<style>
#salary{
  margin-bottom: 1em;
}
</style>