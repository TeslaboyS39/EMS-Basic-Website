<script>
import ReusableButton from './ReusableButton.vue';

export default {
  props: ['branches', 'currentPage', 'inputAddEmployee', 'fullName', 'buttonText'],
  emits: ['editEmployeeForm'],
  components: {
    ReusableButton,
  },
  data() {
    return {
      inputEmployee: {
        fullName: '',
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
        // Buat ngirim event dgn data movie yg diisi sama pengguna
        console.log(this.inputEmployee);
    }
  },
  created() {
    if (this.currentPage === 'editemployee') {
      this.inputEmployee = this.inputAddEmployee;
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

        <label for="startContractDate">Start Contract Date:</label>
        <textarea v-model="inputEmployee.startContractDate" id="startContractDate" name="startContractDate" ></textarea>
        
        <label for="endContractDate">End Contract Date:</label>
        <textarea v-model="inputEmployee.endContractDate" id="endContractDate" name="endContractDate" ></textarea>
        
        <ReusableButton type="submit" :text="buttonText"/>
      </form>
    </div>
  </section>
</template>