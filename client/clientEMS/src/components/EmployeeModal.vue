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
      return this.employee.photo ? this.employee.photo : Photo;
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
          <h3>{{ employee.fullName }}</h3>
          <hr>
          <h5>Email: {{ employee.email }}</h5>
          <h5>Position: {{ employee.Position.name }}</h5>
          <h5>Branch: {{ employee.Branch.name }}</h5>
          <h5>Employment Status: {{ employee.employmentStatus }}</h5>
          <h5>Salary: {{ formattedSalary }}</h5>
          <h5>Join Date: {{ formattedStartContractDate }}</h5>
          <h5>Renewal Employee Status Date: {{ formattedEndContractDate }}</h5>
          <!-- other info -->
  
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
}

.left-section img {
  width: 50vh;
  height: 55vh;
  border-radius: 5px;
}

.right-section h5{
  width: 100%;
  color: black;
  margin-bottom: 0.5rem;
} 

.right-section button {
  align-self: center;
  margin-top: 4vh; 
  border-radius: 5px;
}
</style>