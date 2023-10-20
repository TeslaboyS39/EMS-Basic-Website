<script>
export default {
  props: ['index', 'employee'],
  methods: {
    editEmployee() {
      this.$emit('editEmployee', this.employee.id);
      console.log(this.employee.id);
    },
    updateEmployeeStatus(employee) {
      this.$emit('update-employee-status', employee);
    }
  }
};
</script>

<template>
  <tr>
    <td>{{index + 1}}</td>
    <td>{{employee.fullName}}</td>
    <!-- <td><img :src="employee.imageUrl" alt="Employee Portrait Photo" class="portrait-image"></td> -->
    <td>{{employee.email}}</td>
    <!-- <td>⭐{{movie.rating}}/10</td> -->
    <!-- <td><a :href="movie.trailerUrl">Watch Trailer</a></td> -->
    <td>{{employee.Branch.name}}</td>
    <td>{{employee.Position.name}}</td>
    <td>{{employee.startContractDate}}</td>
    <td>{{employee.endContractDate}}</td>
    <td>
      <select v-model="employee.status" @change="updateEmployeeStatus(employee)">
        <option value="null">Select Status</option>
        <option value="Active">Active</option>
        <option value="Warning">Warning</option>
        <option value="Resigned/Fired">Resigned/Fired</option>
      </select>
    </td>
    <td><button class="edit-button" @click="editEmployee">✏️</button></td>
  </tr>
</template>