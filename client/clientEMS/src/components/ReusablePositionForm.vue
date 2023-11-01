<script>
import ReusableButton from './ReusableButton.vue';

export default {
  props: ['currentPage', 'inputAddPosition', 'fullName', 'name', 'buttonText'],
  emits: ['editPositionForm'],
  components: {
    ReusableButton
  },
  data() {
    return {
      inputPosition: {
        name: '',
      }
    };
  },
  methods: {
    handleInputPosition() {
        if (this.currentPage === 'editposition') {
          this.$emit('editPositionForm', this.inputPosition);
        } else if (this.currentPage === 'addposition'){
          this.$emit('addPositionForm', this.inputPosition);          
        }
        // Buat ngirim event dgn data position yg diisi sama pengguna
        console.log(this.inputPosition);
    }
  },
  created() {
    if (this.currentPage === 'editposition') {
      this.inputPosition = this.inputAddPosition;
    }
    console.log(this.inputPosition, 'Punya si Reusable');
  }
};
</script>

<template>
  <section id="addposition-section">
    <div class="add-position-form">
      <h2>{{name}}</h2>
      <form @submit.prevent="handleInputPosition">
        <label for="name">Position Name:</label>
        <input v-model="inputPosition.name" type="text" id="name" name="name" />
        
        <ReusableButton type="submit" :text="buttonText"/>
      </form>
    </div>
  </section>
</template>