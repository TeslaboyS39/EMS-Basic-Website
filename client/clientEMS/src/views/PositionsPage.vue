<script>
export default {
   props: ['currentPage', 'positions'], 
}
</script>

<template>
    <section v-if="currentPage === 'showpositions'" id="showpositions-section">
        <div class="position-collection">
        <h2>Positions List</h2>
        <table class="table">
            <thead>
                <tr>
                <th class="table-header">#</th>
                <th class="table-header">Name</th>
                <th class="table-header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(position, index) in positions" :key="position.id">
                <td>{{index + 1}}</td>
                <td>{{position.name}}</td>
                <td><button class="edit-button">✏️</button></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary position-add-button" disabled>Add Position</button>
        </div>
    </section>
</template>