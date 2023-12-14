<script>
import Photo from '../assets/default-photo.png'
import { formatDate } from '../helpers/dateFormatter';
import { formatToRupiah } from '../helpers/rupiahFormatter';
export default {
  props: ['employee'],
  computed: {
    formattedSalary() {
      return formatToRupiah(this.employee.salary);
    },
    formattedStartContractDate() {
      return formatDate(this.employee.startContractDate);
    },
    formattedEndContractDate() {
      return formatDate(this.employee.endContractDate);
    },
  },
  created() {
    console.log('Employee details:', this.employee);
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getEmployeePhotoPath() {
      // Use the employee's photo if available, otherwise fallback to the default photo
      return this.employee.photo && this.employee.photo !== 'N/A' ? this.employee.photo : Photo;
    },
  }
}
</script>

<template>
    <div class="modal-overlay">
      <div class="employee-modal" style="background-color: rgb(203, 203, 202);">
        <div class="left-section">
          <img :src="getEmployeePhotoPath()" alt="Employee Photo" />
        </div>
  
        <div class="right-section">
          <div class="header-section">
          <div>
            <h3>{{ employee.fullName }} </h3>
          </div>
          <div>
            <h5 style="margin-right: 5vh; background-color: rgb(172, 172, 171); border-radius: 1vh; padding: 1vh;">KPI = {{ employee.kpi }}</h5>
          </div>
        </div>
          <hr>
          <h5><span style="margin-right: 34.5vh;">Email</span>: {{ employee.email }}</h5>
          <h5><span style="margin-right: 31vh;">Position</span>: {{ employee.Position.name }}</h5>
          <h5><span style="margin-right: 32.5vh;">Branch</span>: {{ employee.Branch.name }}</h5>
          <h5><span style="margin-right: 15.5vh;">Employment Status</span>: {{ employee.employmentStatus }}</h5>
          <h5><span style="margin-right: 33.6vh;">Salary</span>: {{ formattedSalary }}</h5>
          <h5><span style="margin-right: 29.3vh;">Join Date</span>: {{ formattedStartContractDate }}</h5>
          <h5><span style="margin-right: 14.2vh;">Renewal Status Date</span>: {{ formattedEndContractDate }}</h5>
          <h5><span style="margin-right: 25vh;">Leave Quota</span>: {{ employee.leaveQuota }}</h5>
          <h5><span style="margin-right: 5vh;">Alpha Qty before Dismissal</span>: {{ employee.alphaQuota }}</h5>
          <h5><span style="margin-right: 21.7vh;">Warning Letter</span>: {{ employee.warningLetter }}</h5>
          <h5><span style="margin-right: 23.2vh;">Bank Account</span>: {{ employee.bankAccNum}}</h5>
  
          <button class="btn btn-primary" @click="close">Close</button>
        </div>
    </div>
</div>
  </template>

<style>
.modal-overlay {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.employee-modal {
  width: 150vh;
  height: 65vh;
  background: rgb(174, 171, 171);
  padding: 20px;
  border-radius: 5px;
  display: flex; 
}

.left-section {
  width: 30%;
  margin-right: 10vh; 
  margin-top: 2vh;
  margin-left: 2vh;
}

.right-section {
    margin-top: 3vh;
    display: flex;
    flex-direction: column; 
    flex: 1
}

.left-section img {
  width: 50vh;
  height: 53vh;
  border-radius: 5px;
}

.right-section h5{
  width: 100%;
  color: black;
  margin-bottom: 0.01rem;
} 

.right-section button {
  align-self: center;
  margin-top: 2.5vh; 
  margin-right: 50vh;
  border-radius: 5px;
}

.right-section .info-item {
  width: 100%;
  margin-bottom: 0.5rem;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>