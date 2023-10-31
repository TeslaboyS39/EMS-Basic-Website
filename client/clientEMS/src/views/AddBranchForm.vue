<script>
import ReusableBranchForm from '../components/ReusableBranchForm.vue'

export default {
  props: ['currentPage'],
  emits: ['submit-branch'],
  components: {
    ReusableBranchForm,
  },
  methods: {
    handleAddBranch(inputBranch) {
      this.$emit('submit-branch', inputBranch);
    },
    handleInputBranch(){
      if (this.currentPage === 'addbranch'){
        this.$emit('addBranchForm', this.inputBranch);          
      }
    }
  }
};
</script>

<template>
<ReusableBranchForm 
    title="Add Branch"
    buttonText="Add Branch"
    :currentPage="currentPage"
    @addBranchForm="handleAddBranch"
/>
</template>