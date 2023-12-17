<script>
import { formatDate } from '../helpers/dateFormatter';

export default {
  props: ['currentPage', 'logs'],
  computed: {
    formattedLogs() {
      return this.logs.map(log => {
        return {
          ...log,
          formattedCreatedDate: formatDate(log.createdAt),
        };
      });
    },
  },
};
</script>

<template>
  <section v-if="currentPage === 'showlogs'" id="showlogs-section">
    <div class="log-collection">
      <div class="header-wrapper">
        <h2 style="color: azure;">Activity Logs</h2>
      </div>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th class="table-header" style="width: 9%;">#</th>
              <th class="table-header" style="text-align:center">Entity Name</th>
              <th class="table-header" style="text-align:center">Description</th>
              <th class="table-header" style="text-align:center">Updated By</th>
              <th class="table-header" style="text-align:center">Time Log</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in formattedLogs" :key="log.id">
              <td id="td-row" style="text-align: center;">{{ index + 1 }}</td>
              <td id="td-row" style="text-align: center;">{{ log.title }}</td>
              <td id="td-row" style="text-align: center;">{{ log.description }}</td>
              <td id="td-row" style="text-align: center;">{{ log.updatedBy }}</td>
              <td id="td-row" style="text-align: center;">{{ log.formattedCreatedDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
