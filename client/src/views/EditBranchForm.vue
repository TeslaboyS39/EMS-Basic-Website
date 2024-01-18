<script>
import ReusableBranchForm from '../components/ReusableBranchForm.vue';

export default {
    props: ['currentPage', 'inputAddBranch'],
    emits: ['editBranchForm'],
    components: {
        ReusableBranchForm
    },
    methods: {
        editBranchForm(inputBranch) {
            this.$emit('editBranchForm', inputBranch);
        }
    }
}
</script>

<template>
<div> 
    <ReusableBranchForm 
        title="Edit Branch"
        buttonText="Edit Branch"
        :inputAddBranch="inputAddBranch"
        :currentPage="currentPage"
        @editBranchForm="editBranchForm" 
    />
</div>
</template>