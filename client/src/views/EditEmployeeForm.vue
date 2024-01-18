<script>
import ReusableEmployeeForm from '../components/ReusableEmployeeForm.vue';
import KpiModal from '../components/KpiModal.vue'

export default {
    props: ['branches', 'positions', 'currentPage', 'inputAddEmployee'],
    emits: ['editEmployeeForm'],
    components: {
        ReusableEmployeeForm, KpiModal
    },
    data() {
        return {
            selectedEmployee: null,
            isModalVisible: false
        };
    },
    methods: {
        editEmployeeForm(inputEmployee) {
            this.$emit('editEmployeeForm', inputEmployee);
        },
        showKpiModal(employee) {
            this.selectedEmployee = employee  
            this.isModalVisible = true;
        },
        applyKpiToEmployee(kpiValue) {
            this.selectedEmployee.kpi = kpiValue
            // update kpi pada employee data   
        }
    }
}
</script>

<template>
    <kpi-modal
        :employee="selectedEmployee"
        v-if="isModalVisible"
        @close="isModalVisible = false"
        @applyKPI="applyKpiToEmployee"
    />
    <div> 
        <ReusableEmployeeForm 
        :branches="branches"
        :positions="positions"
        title="Edit Employee"
        buttonText="Edit Employee"
        :inputAddEmployee="inputAddEmployee"
        :currentPage="currentPage"
        @editEmployeeForm="editEmployeeForm" 
        @show-kpi-modal="showKpiModal"
        />            
    </div>
</template>