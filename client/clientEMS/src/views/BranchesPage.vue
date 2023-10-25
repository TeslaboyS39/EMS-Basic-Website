<script>
export default {
   props: ['currentPage', 'branches'], 
}
</script>

<template>
    <section v-if="currentPage === 'showbranches'" id="showbranches-section">
        <div class="branch-collection">
        <div class="header-wrapper">
            <h2 style="color: azure;">Branches List</h2>
            <button class="btn btn-primary branch-add-button" disabled>Add Branch</button>
        </div>
        <table class="table">
            <thead>
                <tr class="table-header">
                <th class="table-header" style="width: 9%;">#</th>
                <th class="table-header">Name</th>
                <th class="table-header" style="width: 20.55%;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(branch, index) in branches" :key="branch.id">
                <td id="td-row">{{index + 1}}</td>
                <td id="td-row">{{branch.name}}</td>
                <td id="td-row"><button class="edit-button">✏️</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </section>
</template>