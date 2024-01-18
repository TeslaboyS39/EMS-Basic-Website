<script>
import ReusablePositionForm from '../components/ReusablePositionForm.vue';

export default {
    props: ['currentPage', 'inputAddPosition'],
    emits: ['editPositionForm'],
    components: {
        ReusablePositionForm
    },
    methods: {
        editPositionForm(inputPosition) {
            this.$emit('editPositionForm', inputPosition);
        }
    }
}
</script>

<template>
<div> 
    <ReusablePositionForm 
        title="Edit Position"
        buttonText="Edit Position"
        :inputAddPosition="inputAddPosition"
        :currentPage="currentPage"
        @editPositionForm="editPositionForm" 
    />
</div>
</template>