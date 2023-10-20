<script>
export default {
   props: ['currentPage', 'branches'], 
}
</script>

<template>
    <section v-if="currentPage === 'showbranches'" id="showbranches-section">
        <div class="branch-collection">
        <h2>Branches List</h2>
        <table class="table">
            <thead>
                <tr>
                <th class="table-header">#</th>
                <th class="table-header">Name</th>
                <th class="table-header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(branch, index) in branches" :key="branch.id">
                <td>{{index + 1}}</td>
                <td>{{branch.name}}</td>
                <td><button class="edit-button">✏️</button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary branch-add-button" disabled>Add Branch</button>
        </div>
    </section>
</template>