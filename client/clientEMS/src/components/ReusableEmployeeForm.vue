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
        employmentStatus: ''
      },
      isModalVisible: false,
      selectedEmployee: null  
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
    },
    showKpiModal() {
      this.$emit('show-kpi-modal', this.inputEmployee);
    },
    updateEmployeeKpi(kpi) {  
      this.inputEmployee.kpi = kpi
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

        <label for="bankAccNum">Bank Account:</label>
        <input v-model="inputEmployee.bankAccNum" type="number" id="bankAccNum" name="bankAccNum" />

        <div class="header-section-kpi">
          <label for="kpi">Key Performances Index (KPI):</label>
          <h4 class="calc-button" title="KPI Calculator" @click="showKpiModal" style="cursor: pointer; margin-left: 2vh; margin-bottom: 2vh; color: orange; font-size: 5.5vh;">🖩</h4>
        </div>
        <input v-model="inputEmployee.kpi" type="number" min="0" step="any" id="kpi" name="kpi" placeholder="Leave it empty for add new employee"/>

        <label for="photo">Profile Photo (URL):</label>
        <input v-model="inputEmployee.photo" type="text" id="photo" name="photo" />

        <label for="warningLetter">Warning Letter:</label>
        <input v-model="inputEmployee.warningLetter" type="number" id="warningLetter" name="warningLetter" min="0" max="2" />

        <label for="employmentStatus">Employment Status:</label>
        <select v-model="inputEmployee.employmentStatus" id="employmentStatus" name="employmentStatus">
          <option value="Full-time">Full-time</option>
          <option value="Probation">Probation</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        
        <ReusableButton type="submit" :text="buttonText"/>
      </form>
    </div>
  </section>
</template>

<style>
#salary  {
  margin-bottom: 1em;
}

#bankAccNum{
  margin-bottom: 1em;
}

#kpi{
  margin-bottom: 1em;
}

.calc-button{
  background-color: transparent;
  cursor: pointer;
}

.header-section-kpi {
    display: flex;
    justify-content: start;
    align-items:center;
}

.header-section-kpi h4:hover {
  color: purple; /* Ubah warna saat dihover */
  transform: scale(1.2); /* Ubah ukuran saat dihover */
  transition: color 0.2s ease, transform 0.2s ease; /* Animasi perubahan warna dan ukuran */
}

</style>