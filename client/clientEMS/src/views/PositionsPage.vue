<script>
import ReusableButton from "../components/ReusableButton.vue";
export default {
   props: ['currentPage', 'positions'], 
   components: {
    ReusableButton
   }, 
   methods: {
    addPosition() {
        console.log('Add Position button clicked');
        this.$emit('addPosition');
    },
    editPosition(positionId) {
        console.log('Edit Position button clicked for position ID:', positionId);
        this.$emit('editPosition', positionId);
    },
  }
}
</script>

<template>
    <section v-if="currentPage === 'showpositions'" id="showpositions-section"  style="padding-bottom: 2vh;">
        <div class="position-collection">
        <div class="header-wrapper">
            <h2 style="color: azure;">Positions List</h2>
            <ReusableButton @click="addPosition" text="Add Position" type="button"/>            
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th class="table-header" style="width: 9%;">#</th>
                    <th class="table-header" style="text-align:left">Name</th>
                    <th class="table-header" style="width: 20.55%;"></th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(position, index) in positions" 
                    :key="position.id"
                    :index="index"
                    :position="position"
                >
                <td id="td-row" style="text-align: center;">{{index + 1}}</td>
                <td id="td-row">{{position.name}}</td>
                <td id="td-row">
                    <button v-if="position" class="edit-button" @click="editPosition(position.id)">✏️</button>
                </td>
                </tr>
            </tbody>
        </table>
        </div>
    </section>
</template>