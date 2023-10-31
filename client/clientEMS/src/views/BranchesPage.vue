<script>
import ReusableButton from "../components/ReusableButton.vue";
export default {
  props: ['currentPage', 'branches'],
  components: {
    ReusableButton
  }, 
  methods: {
    addBranch() {
        console.log('Add Branch button clicked');
        this.$emit('addBranch');
    },
    editBranch(branchId) {
        this.$emit('editBranch', branchId);
    },
  }
}
</script>

<template>
    <section v-if="currentPage === 'showbranches'" id="showbranches-section">
        <div class="branch-collection">
        <div class="header-wrapper">
            <h2 style="color: azure;">Branches List</h2>
            <ReusableButton @click="addBranch" text="Add Branch" type="button"/>
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
                    v-for="(branch, index) in branches" 
                    :key="branch.id"
                    :index="index"
                    :branch="branch"
                >
                <td id="td-row" style="text-align: center;">{{index + 1}}</td>
                <td id="td-row">{{branch.name}}</td>
                <td id="td-row"><button class="edit-button">✏️</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </section>
</template>