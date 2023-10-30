<script>
export default {
   props: ['currentPage', 'positions'], 
}
</script>

<template>
    <section v-if="currentPage === 'showpositions'" id="showpositions-section">
        <div class="position-collection">
        <div class="header-wrapper">
            <h2 style="color: azure;">Positions List</h2>
            <button class="btn btn-primary position-add-button" disabled>Add Position</button>            
        </div>
        <table class="table">
            <thead>
                <tr>
                <th class="table-header" style="text-align: center;">#</th>
                <th class="table-header" style="text-align: left;">Name</th>
                <th class="table-header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(position, index) in positions" :key="position.id">
                <td id="td-row" style="text-align: center;">{{index + 1}}</td>
                <td id="td-row">{{position.name}}</td>
                <td id="td-row"><button class="edit-button">✏️</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </section>
</template>