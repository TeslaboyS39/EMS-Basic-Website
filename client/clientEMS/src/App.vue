<script>
// script disini tidak menggunakan setup(ini baru digunakan untuk composition api)
import Navbar from "./components/Navbar.vue"
import DashboardPage from "./views/DashboardPage.vue"
import EmployeesPage from "./views/EmployeesPage.vue"
import BranchesPage from "./views/BranchesPage.vue"
import PositionsPage from "./views/PositionsPage.vue"
import { formatDate } from './helpers/dateFormatter';
import AddEmployeeForm from "./views/AddEmployeeForm.vue"
import EditEmployeeForm from "./views/EditEmployeeForm.vue"
import LoginPage from "./views/LoginPage.vue"
import RegisterPage from "./views/RegisterPage.vue"
// const baseUrl = 'https://client-project-01.fatahillah.shop' // for production
const baseUrl = 'http://localhost:3000' // for testing use

export default {
    components: {
      Navbar, DashboardPage, EmployeesPage, BranchesPage, PositionsPage, AddEmployeeForm, EditEmployeeForm, LoginPage, RegisterPage
    },
    data() {
    return {
      fullName: '',
      currentPage: '',
      navStatus: 'disabled',
      inputRegister:{
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        npk: ''
      },
      inputLogin: {
        email: '',
        password: ''
      },
      employees: [],
      branches: [],
      positions: [],
      inputAddEmployee: {
        fullName: '',
        email: '',
        BranchId: '',
        JobId: '',
        startContractDate: '',
        endContractDate: '',
      }
    };
  },
  computed: {
    formatDate
  },
  methods: {
    async fetchDataEmployees() {
      try {
        // console.log('data fetched succesfully')
        const { data } = await axios ({
          method: 'get',
          url: `${baseUrl}/employees`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        
        // console.log(data);
        this.employees = data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataBranches() {
      try {
        // console.log('data fetched succesfully')
        const { data } = await axios ({
          method: 'get',
          url: `${baseUrl}/branches`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        
        // console.log(data);
        this.branches = data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataPositions() {
      try {
        // console.log('data fetched succesfully')
        const { data } = await axios ({
          method: 'get',
          url: `${baseUrl}/positions`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        
        // console.log(data);
        this.positions = data
      } catch (error) {
        console.log(error);
      }
    },
    switchToLogin() {
      this.currentPage = "login";
    },
    async changePage(page) {
      this.currentPage = page;
    },
    async editEmployeeForm(inputEmployee) {
      console.log(inputEmployee, '<<< Positions');
      try {
        const { data } = await axios ({
          method: 'put',
          url: `${baseUrl}/employees/${inputEmployee.id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: inputEmployee
        })
        console.log(data);
        this.fetchDataEmployees();
        this.currentPage='showemployees'
        Swal.fire(
          'Edit employee success!',
          'Thank you for edit an employee data in database',
          'success'
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editEmployee(employeeId) {
      try {
        const employeeData = await this.fetchEmployeeById(employeeId);
          this.inputAddEmployee = {
            id: employeeData.id,
            fullName: employeeData.fullName,
            email: employeeData.email,
            BranchId: employeeData.BranchId,
            JobId: employeeData.JobId,
            startContractDate: new Date(employeeData.startContractDate).toISOString().split('T')[0],
            endContractDate: new Date(employeeData.endContractDate).toISOString().split('T')[0],
          };
          this.changePage('editemployee') 
      } catch (error) {
        console.log(error);
      }
    },
    async doRegister(value) {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseUrl}/register`,
          data: value
        })
        console.log(response);

        if (response.status === 201) {
          this.switchToLogin();
          Swal.fire("Registration Success!", "Now you're able to sign in.", "success");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async doLogin(inputLogin) {
      try {
        const response = await axios({
          method: 'post',
          url: `${baseUrl}/login`,
          data: inputLogin
        })
        // console.log(response);
        // console.log(response.data, '<<<<<< ini response datanya');
        this.currentPage = "dashboard"
        this.navStatus = 'active'

        const accessToken = response.data.access_token;
        const fullName = response.data.fullName;
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('fullName', fullName)

        this.fullName = localStorage.getItem('fullName');        
        this.fetchDataEmployees()
        this.fetchDataBranches()
        this.fetchDataPositions()

        Swal.fire("Login Success!", "Welcome to EMS!", "success");
      } catch (error) {
        console.log(error);
      }
    },
    async addEmployeeForm(addEmployee) {
      try {
        const response = await axios ({
          method: 'post',
          url: `${baseUrl}/employees`,
          data: addEmployee,
          headers: {
            access_token: localStorage.access_token
          }
        })

        if (response.status === 201) {
          // Buat ngereset kolom inputannya misal dah berhasil ditambahin
          this.inputAddEmployee = {
            fullName: '',
            branch: '',
            position: '',
            startContractDate: '',
            endContractDate: '',
          };
          this.fetchDataEmployees();
          this.changePage('showemployees');
          Swal.fire(
                'Add employee success!',
                'Thank you for add an employee in database',
                'success'
          )
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data, '<<<server response');
      }
    },
    async fetchEmployeeById(employeeId) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/employees/${employeeId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
        console.log("Fetched employee by ID:", data);
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async updateEmployee() {
      try {
        const response = await axios({
          method: 'put',
          url: `${baseUrl}/employees/${this.inputAddEmployee.id}`,
          data: this.inputAddEmployee,
          headers: {
            access_token: localStorage.access_token,
          },
        })

        if (response.status === 200) {
          this.inputAddEmployee = {
            id: '',
            fullName: '',
            BranchId: '',
            JobId: '',
            startContractDate: '',
            endContractDate: '',
          }

          this.fetchDataEmployees();
          this.changePage('showemployees');
          
          Swal.fire(
                'Update employee success!',
                'Thank you for update an employee in database',
                'success'
          )
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Forbidden access to update this data!'
        })
      }
    },
    async updateEmployeeStatus(employee) {
      try {
        const response = await axios({
          method: 'patch',
          url: `${baseUrl}/employees/${employee.id}`,
          data: {
            status: employee.status
          },
          headers: {
            access_token: localStorage.access_token,
          },
        })

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Employee status updated successfully.',
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Forbidden access to update this data status!',
        });
      }
    },
    doLogout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('fullName')
      this.currentPage = "register"
      this.navStatus = 'disabled'
      this.fullName = ', welcome to EMS';
    },
  },  
  created() {
  if (localStorage.access_token) {
    this.currentPage = 'dashboard'
    this.fullName = localStorage.fullName
    this.navStatus = 'active'
    this.fetchDataEmployees()
    this.fetchDataBranches()
    this.fetchDataPositions()
  } else {
    this.currentPage = 'register'
    this.fullName = ', welcome to EMS'      
  }
  }
}
</script>

<template>
<div class="main-container">
  <!-- NAVBAR SECTION -->
  <Navbar :fullName="fullName" :currentPage="currentPage" :navStatus="navStatus" :changePage="changePage" :doLogout="doLogout" />
  <!-- END NAVBAR SECTION -->

  <!-- PRE LOGIN SECTION -->
  <div class="form-container">
    <!-- REGISTER FORM SECTION -->
    <RegisterPage v-if="currentPage === 'register'" 
    @doRegister="doRegister" 
    @switchToLogin="switchToLogin"
    />
    <!-- END REGISTER FORM SECTION -->

    <!-- LOGIN FORM SECTION -->
    <LoginPage v-if="currentPage === 'login'" 
    @doLogin="doLogin"
    />
    <!-- END LOGIN FORM SECTION -->
  </div>
  <!-- END PRE LOGIN SECTION -->

  <!-- POST LOGIN SECTION -->
  <!-- DASHBOARD SECTION -->
  <DashboardPage v-if="currentPage === 'dashboard'" :employees="employees" :branches="branches" :positions="positions" :currentPage="currentPage" />
  <!-- END DASHBOARD SECTION -->

  <!-- EMPLOYEES SECTION -->
  <EmployeesPage
    v-if="currentPage === 'showemployees'"
    :employees="employees"
    :currentPage="currentPage"
    @editEmployee="editEmployee"
    @addEmployee="changePage('addemployee')"
    @update-employee-status="updateEmployeeStatus"
  />
  <!-- END EMPLOYEES SECTION -->

  <!-- ADD EMPLOYEE FORM SECTION -->
  <AddEmployeeForm
    v-if="currentPage === 'addemployee'"
    :branches="branches"
    :positions="positions"
    :currentPage="currentPage"
    @submit-employee="addEmployeeForm"
  />
  <!-- END ADD EMPLOYEE FORM SECTION -->

  <!-- EDIT EMPLOYEE FORM SECTION -->
  <EditEmployeeForm
    v-if="currentPage === 'editemployee'"
    :branches="branches"
    :positions="positions"
    :inputAddEmployee="inputAddEmployee"
    :currentPage="currentPage"
    @editEmployeeForm="editEmployeeForm" 
  />
  <!-- END EDIT EMPLOYEE FORM SECTION -->
  
  <!-- BRANCHES SECTION -->
  <BranchesPage v-if="currentPage === 'showbranches'" :branches="branches" :currentPage="currentPage" />
  <!-- END BRANCHES SECTION -->

  <!-- POSITIONS SECTION -->
  <PositionsPage v-if="currentPage === 'showpositions'" :positions="positions" :currentPage="currentPage" />
  <!-- END POSITIONS SECTION -->
</div>
</template>

<style>
/* navbar beserta isinya */
p {
  color: white;
  margin: 0;
}

.nav-link.active {
  font-weight: bold; 
}

.navbar-brand {
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: #535d67;
  padding: 3px;
  border-radius: 5px;
}

.logo-img {
  height: 50px; 
  margin-right: 5px; 
  margin-left: 5px;
  border-radius: 5px;
}

.nav-item {
  padding-left: 18vh;
}

/* Register and Login section */
.register-container,
.login-container {
  background-color: #e6dddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 14.7px auto;
  max-width: 400px;
  text-align: center;
}

.login-container {
  margin-top: 25vh;
}

.register-container h2,
.login-container h2 {
  margin-bottom: 20px;
}

.register-container form,
.login-container form {
  display: flex;
  flex-direction: column;
}

.register-container input,
.login-container input,
.register-container select {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-container button,
.login-container button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#register-section {
  padding-bottom: 0.009vh;
}

#login-section {
  padding-bottom: 25.3vh;
}
/* setelah login nampilin dashboard di homepagenya */
.dashboard-section {
  /* background-color: #dbd4d4; */
  background-color: rgba(219, 212, 212, 0.7);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
  margin-top: 25vh;
}

.dashboard-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.dashboard-item {
  flex: 1;
  padding: 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  margin-right: 10px;
}

.dashboard-item:last-child {
  margin-right: 0;
  /* Biar branchnya gak usah pakai margin */
}

.dashboard-item h3 {
  font-size: 18px;
}

.dashboard-item p {
  font-size: 39px;
  font-weight: bold;
}

/* menu showemployees */
.table {
  margin-left: 35px;
  margin-top: auto;
  width: 90%;
}

.employee-collection h2 {
  margin-left: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.employee-add-button {
  margin-top: 10px;
  margin-left: 35px;
  margin-bottom: 10px;
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

.edit-button {
  padding: 6px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.poster-image {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

/* form add employee */
.add-employee-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

.add-employee-form label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.add-employee-form input[type="text"],
.add-employee-form input[type="url"],
.add-employee-form select,
.add-employee-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-employee-form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-employee-form input[type="number"] {
  width: 85vh;
}

/* form edit employee */
.edit-employee-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

.edit-employee-form label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.edit-employee-form input[type="text"],
.edit-employee-form input[type="url"],
.edit-employee-form select,
.edit-employee-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-employee-form button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-employee-form input[type="number"] {
  width: 85vh;
}

/* menu show branches */
.table {

  margin-top: auto;
  width: 90%;
}

.branch-collection h2 {
  margin-left: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.branch-add-button {
  margin-left: 35px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #dc4040;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2vh;
}

/* menu show positions */
.table {
  margin-left: 35px;
  margin-top: auto;
  width: 90%;
}

.position-collection h2 {
  margin-left: 35px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.position-add-button {
  margin-left: 35px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2vh;
}

#td-row{
  background-color: rgba(174, 172, 172, 0.8);
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  padding-right: 16vh;
}

.main-container {
  background-image: url('https://wallpaperbat.com/img/704147-website-wallpaper-top-free-website-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh; 
  min-width: 100vh;
}
</style>
