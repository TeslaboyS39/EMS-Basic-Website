<script>
import ReusableEmployeeForm from '../components/ReusableEmployeeForm.vue';

export default {
    props: ['branches', 'positions', 'currentPage', 'inputAddEmployee'],
    emits: ['editEmployeeForm'],
    components: {
        ReusableEmployeeForm
    },
    methods: {
        editEmployeeForm(inputEmployee) {
            this.$emit('editEmployeeForm', inputEmployee);
        }
    }
}
</script>

<template>
<div> 
    <ReusableEmployeeForm 
        :branches="branches"
        :positions="positions"
        title="Edit Employee"
        buttonText="Edit Employee"
        :inputAddEmployee="inputAddEmployee"
        :currentPage="currentPage"
        @editEmployeeForm="editEmployeeForm" 
    />
</div>
</template>