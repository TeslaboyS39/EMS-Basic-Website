<script>
import ReusableButton from './ReusableButton.vue';

export default {
  props: ['currentPage', 'inputAddBranch', 'name', 'buttonText'],
  emits: ['editBranchForm'],
  components: {
    ReusableButton
  },
  data() {
    return {
      inputBranch: {
        name: '',
      }
    };
  },
  methods: {
    handleInputBranch() {
        if (this.currentPage === 'editbranch') {
          this.$emit('editBranchForm', this.inputBranch);
        } else if (this.currentPage === 'addbranch'){
          this.$emit('addBranchForm', this.inputBranch);          
        }
        // Buat ngirim event dgn data branch yg diisi sama pengguna
        console.log(this.inputBranch);
    }
  },
  created() {
    if (this.currentPage === 'editbranch') {
      this.inputBranch = this.inputAddBranch;
    }
    console.log(this.inputBranch, 'Punya si Reusable');
  }
};
</script>

<template>
  <section id="addbranch-section">
    <div class="add-branch-form">
      <h2>{{name}}</h2>
      <form @submit.prevent="handleInputBranch">
        <label for="name">Branch Name:</label>
        <input v-model="inputBranch.name" type="text" id="name" name="name" />
        
        <ReusableButton type="submit" :text="buttonText"/>
      </form>
    </div>
  </section>
</template>