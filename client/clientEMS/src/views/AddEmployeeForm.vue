<script>
import ReusableEmployeeForm from '../components/ReusableEmployeeForm.vue';

export default {
  props: ['branches', 'positions', 'currentPage'],
  emits: ['submit-employee'],
  components: {
    ReusableEmployeeForm,
  },
  methods: {
    addEmployeeForm(inputEmployee) {
      this.$emit('addEmployeeForm', inputEmployee);
    }
  }
};
</script>

<template>
<ReusableEmployeeForm 
    :branches="branches"
    :positions="positions"
    title="Add Employee"
    buttonText="Add Employee"
    :currentPage="currentPage"
    @addEmployeeForm="addEmployeeForm"
/>
</template>