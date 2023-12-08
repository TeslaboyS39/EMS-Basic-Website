<script>
// script disini tidak menggunakan setup(ini baru digunakan untuk composition api)
import Navbar from "./components/Navbar.vue"
import DashboardPage from "./views/DashboardPage.vue"
import EmployeesPage from "./views/EmployeesPage.vue"
import BranchesPage from "./views/BranchesPage.vue"
import PositionsPage from "./views/PositionsPage.vue"
import { formatDate } from "./helpers/dateFormatter"
import AddEmployeeForm from "./views/AddEmployeeForm.vue"
import AddBranchForm from "./views/AddBranchForm.vue"
import AddPositionForm from "./views/AddPositionForm.vue"
import EditEmployeeForm from "./views/EditEmployeeForm.vue"
import EditBranchForm from "./views/EditBranchForm.vue"
import EditPositionForm from "./views/EditPositionForm.vue"
import LoginPage from "./views/LoginPage.vue"
import RegisterPage from "./views/RegisterPage.vue"
// const baseUrl = 'https://client-project-01.fatahillah.shop' // for production
const baseUrl = 'http://localhost:3000' // for testing use

export default {
    components: {
      Navbar, DashboardPage, EmployeesPage, BranchesPage, PositionsPage, AddEmployeeForm, AddBranchForm, AddPositionForm, EditEmployeeForm, EditBranchForm, EditPositionForm, LoginPage, RegisterPage
    },
    data() {
    return {
      fullName: '',
      name: '',
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
        salary: '',
        employmentStatus: '',
      },
      inputAddBranch: {
        name: '',
      },
      inputAddPosition: {
        name: '',
      },
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
            salary: employeeData.salary,
            employmentStatus: employeeData.employmentStatus,
          };
          this.changePage('editemployee') 
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBranchById(branchId) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/branches/${branchId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
        console.log("Fetched branch by ID:", data);
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPositionById(positionId) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/positions/${positionId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
        console.log("Fetched position by ID:", data);
        return data
      } catch (error) {
        console.log(error);
      }
    },
    async updateBranch() {
      try {
        const response = await axios({
          method: 'put',
          url: `${baseUrl}/branches/${this.inputAddBranch.id}`,
          data: this.inputAddBranch,
          headers: {
            access_token: localStorage.access_token,
          },
        })

        if (response.status === 200) {
          this.inputAddBranch = {
            id: '',
            name: '',
          }

          this.fetchDataBranches();
          this.changePage('showbranches');
          
          Swal.fire(
                'Update branch success!',
                'Thank you for update a branch in database',
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
    async updatePosition() {
      try {
        const response = await axios({
          method: 'put',
          url: `${baseUrl}/positions/${this.inputAddPosition.id}`,
          data: this.inputAddPosition,
          headers: {
            access_token: localStorage.access_token,
          },
        })

        if (response.status === 200) {
          this.inputAddPosition = {
            id: '',
            name: '',
          }

          this.fetchDataPositions();
          this.changePage('showpositions');
          
          Swal.fire(
                'Update position success!',
                'Thank you for update a position in database',
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
    async editBranchForm(inputBranch) {
      console.log(inputBranch, '<<< Branch');
      try {
        const { data } = await axios ({
          method: 'put',
          url: `${baseUrl}/branches/${inputBranch.id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: inputBranch
        })
        console.log(data);
        this.fetchDataBranches();
        this.currentPage='showbranches'
        Swal.fire(
          'Edit branch success!',
          'Thank you for edit an employee data in database',
          'success'
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editBranch(branchId) {
      try {
        const branchData = await this.fetchBranchById(branchId);
          this.inputAddBranch = {
            id: branchData.id,
            name: branchData.name,
          };
          this.changePage('editbranch') 
      } catch (error) {
        console.error(error);
      }
    },
    async editPositionForm(inputPosition) {
      console.log(inputPosition, '<<< Position');
      try {
        const { data } = await axios ({
          method: 'put',
          url: `${baseUrl}/positions/${inputPosition.id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: inputPosition
        })
        console.log(data);
        this.fetchDataPositions();
        this.currentPage='showpositions'
        Swal.fire(
          'Edit position success!',
          'Thank you for edit a position data in database',
          'success'
        );
      } catch (error) {
        console.log(error);
      }
    },
    async editPosition(positionId) {
      try {
        const positionData = await this.fetchPositionById(positionId);
          this.inputAddPosition = {
            id: positionData.id,
            name: positionData.name,
          };
          this.changePage('editposition') 
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
            salary: '',
            employmentStatus: ''
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
    async addBranchForm(addBranch) {
      try {
        const response = await axios ({
          method: 'post',
          url: `${baseUrl}/branches`,
          data: addBranch,
          headers: {
            access_token: localStorage.access_token
          }
        })

        if (response.status === 201) {
          // Buat ngereset kolom inputannya misal dah berhasil ditambahin
          this.inputAddBranch = {
            name: '',
          };
          this.fetchDataBranches();
          this.changePage('showbranches');
          Swal.fire(
                'Add branch success!',
                'Thank you for add a branch in database',
                'success'
          )
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data, '<<<server response');
      }
    },
    async addPositionForm(addPosition) {
      try {
        const response = await axios ({
          method: 'post',
          url: `${baseUrl}/positions`,
          data: addPosition,
          headers: {
            access_token: localStorage.access_token
          }
        })

        if (response.status === 201) {
          // Buat ngereset kolom inputannya misal dah berhasil ditambahin
          this.inputAddPosition = {
            name: '',
          };
          this.fetchDataPositions();
          this.changePage('showpositions');
          Swal.fire(
                'Add position success!',
                'Thank you for add a position in database',
                'success'
          )
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data, '<<<server response');
      }
    },
    async deleteBranchById(branchId) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${baseUrl}/branches/${branchId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        if (response.status === 200) {
          this.fetchDataBranches();
          Swal.fire(
            'Delete branch success!',
            'The branch has been deleted from the database',
            'success'
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Forbidden access to delete this branch!',
        });
      }
    },
    async deletePositionById(positionId) {
      try {
        const response = await axios({
          method: 'delete',
          url: `${baseUrl}/positions/${positionId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });

        if (response.status === 200) {
          this.fetchDataPositions();
          Swal.fire(
            'Delete position success!',
            'The position has been deleted from the database',
            'success'
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Forbidden access to delete this position!',
        });
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
            salary: '',
            employmentStatus: ''
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
            employeeStatus: employee.employeeStatus
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
  <BranchesPage 
    v-if="currentPage === 'showbranches'" 
    :branches="branches" 
    :currentPage="currentPage" 
    :deleteBranchById="deleteBranchById"
    @addBranch="changePage('addbranch')"
    @editBranch="editBranch"
    @delete-branch="deleteBranchById"
  />
  <!-- END BRANCHES SECTION -->

  <!-- ADD BRANCH FORM SECTION -->
    <AddBranchForm
    v-if="currentPage === 'addbranch'"
    :currentPage="currentPage"
    @submit-branch="addBranchForm"
  />
  <!-- END ADD BRANCH FORM SECTION -->

  <!-- EDIT BRANCH FORM SECTION -->
  <EditBranchForm
    v-if="currentPage === 'editbranch'"
    :inputAddBranch="inputAddBranch"
    :currentPage="currentPage"
    @editBranchForm="editBranchForm" 
  />
  <!-- END EDIT BRANCH FORM SECTION -->

  <!-- POSITIONS SECTION -->
  <PositionsPage 
    v-if="currentPage === 'showpositions'" 
    :positions="positions" 
    :currentPage="currentPage" 
    :deletePositionById="deletePositionById"
    @addPosition="changePage('addposition')"
    @editPosition="editPosition"
    @delete-position="deletePositionById"
  />
  <!-- END POSITIONS SECTION -->

   <!-- ADD POSITION FORM SECTION -->
   <AddPositionForm
    v-if="currentPage === 'addposition'"
    :currentPage="currentPage"
    @submit-position="addPositionForm"
  />
  <!-- END ADD POSITION FORM SECTION -->

  <!-- EDIT POSITION FORM SECTION -->
  <EditPositionForm
    v-if="currentPage === 'editposition'"
    :inputAddPosition="inputAddPosition"
    :currentPage="currentPage"
    @editPositionForm="editPositionForm" 
  />
  <!-- END EDIT POSITION FORM SECTION -->
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
  max-width: 740px;
  text-align: center;
  margin-top: 3vh;
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

.table-header {
  text-align: center;
}

.employee-collection h2 {
  margin-left: 27px;
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

#addemployee-section {
  padding-bottom: 2vh; 
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-employee-form input[type="number"] {
  width: 85vh;
}

/* form add branch */
.add-branch-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

#addbranch-section {
  padding-bottom: 2vh; 
}

.add-branch-form label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.add-branch-form input[type="text"],
.add-branch-form input[type="url"],
.add-branch-form select,
.add-branch-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-branch-form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-branch-form input[type="number"] {
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
  margin-left: 27px;
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
  margin-left: 27px;
  margin-top: auto;
  width: 97%;
}

.position-collection h2 {
  margin-left: 27px;
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

/* form add position */
.add-position-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

#addposition-section {
  padding-bottom: 2vh; 
}

.add-position-form label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.add-position-form input[type="text"],
.add-position-form input[type="url"],
.add-position-form select,
.add-position-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-position-form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-position-form input[type="number"] {
  width: 85vh;
}

#td-row{
  background-color: rgba(174, 172, 172, 0.8);
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  padding-right: 5.5vh;
}

.main-container {
  background-image: url('https://wallpaperbat.com/img/704147-website-wallpaper-top-free-website-background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh; 
  min-width: 100vh;
}

.delete-button {
  background-color: transparent; /* Warna merah */
  color: white;
  margin-left: 5vh;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.table-wrapper {
  max-height: calc(70vh - 5px); 
  overflow-y: auto;
}

.table thead {
  position: sticky;
  top: 0;
  background-color: #fff; 
  z-index: 1; 
}

.table-wrapper::-webkit-scrollbar {
  width: 10px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

.table-wrapper::-webkit-scrollbar-track {
  background-color: #eee;
  border-radius: 5px;
}

.edit-button,
.delete-button {
  padding: 6px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.edit-button:hover,
.delete-button:hover {
  transform: scale(1.1); 
}

.delete-button:hover {
  color: #ff0000; 
}
</style>
