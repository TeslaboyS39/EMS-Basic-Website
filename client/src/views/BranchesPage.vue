<script>
import ReusableButton from "../components/ReusableButton.vue";
export default {
    props: ['currentPage', 'branches'],
    components: {
        ReusableButton
    },
    methods: {
        editBranch(branchId) {
            console.log('Edit Branch button clicked for branch ID:', branchId);
            this.$emit('editBranch', branchId);
        },
        addBranch() {
            console.log('Add Branch button clicked');
            this.$emit('addBranch');
        },
        deleteBranch(branchId) {            
            console.log('Delete Branch button clicked', branchId);
            this.$emit('delete-branch', branchId)
        },
    }
}
</script>

<template>
    <section v-if="currentPage === 'showbranches'" id="showbranches-section">
        <div class="branch-collection">
            <div class="header-wrapper">
                <h2 style="color: azure;">Branches List</h2>
                <ReusableButton @click="addBranch" text="Add Branch" type="button" />
            </div>
            <div class="table-wrapper">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="table-header" style="width: 9%;">#</th>
                            <th class="table-header" style="text-align:left">Name</th>
                            <th class="table-header" style="width: 20.55%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(branch, index) in branches" :key="branch.id" :index="index" :branch="branch">
                        <td id="td-row" style="text-align: center;">{{ index + 1 }}</td>
                        <td id="td-row">{{ branch.name }}</td>
                        <td id="td-row">
                            <button v-if="branch" class="edit-button" @click="editBranch(branch.id)">✏️</button>
                            <button class="delete-button" @click="deleteBranch(branch.id)">❌</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>