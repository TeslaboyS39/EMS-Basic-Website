<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number
  },
  computed: {
    visiblePages() {
      const maxVisiblePages = 3;
      const pages = [];
      const startPage = Math.max(1, this.currentPage - 1);
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('pageChange', page);
      }
    }
  }
};
</script>

<template>
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span v-for="page in visiblePages" :key="page">
        <button @click="goToPage(page)" :class="{ 'pagination-active': currentPage === page }">{{ page }}</button>
      </span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<style>
.pagination {
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative; 
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  color: #888;
}

.pagination-active {
  background-color: #007bff;
  color: #fff;
}
</style>