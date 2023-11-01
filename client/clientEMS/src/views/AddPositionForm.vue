<script>
import ReusablePositionForm from '../components/ReusablePositionForm.vue'

export default {
  props: ['currentPage'],
  emits: ['submit-position'],
  components: {
    ReusablePositionForm,
  },
  methods: {
    handleAddPosition(inputPosition) {
      this.$emit('submit-position', inputPosition);
    },
    handleInputPosition(){
      if (this.currentPage === 'addposition'){
        this.$emit('addPositionForm', this.inputPosition);          
      }
    }
  }
};
</script>

<template>
<ReusablePositionForm 
    title="Add Position"
    buttonText="Add Position"
    :currentPage="currentPage"
    @addPositionForm="handleAddPosition"
/>
</template>