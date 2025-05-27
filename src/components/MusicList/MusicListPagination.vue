<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      上一页
    </button>
    <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: "MusicListPagination",
  props: {
    currentPage: Number,
    totalPages: Number,
  },
};
</script>

<style scoped>
.pagination {
  margin: 24px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.pagination button {
  padding: 4px 16px;
  border-radius: 4px;
  border: 1px solid #fa2a55;
  background: #fff;
  color: #fa2a55;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}
.pagination button:disabled {
  color: #ccc;
  border-color: #eee;
  cursor: not-allowed;
  background: #f5f5f7;
}
</style>
