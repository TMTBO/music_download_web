<template>
  <div class="search-bar">
    <input
      v-model="inputValue"
      @keyup.enter="handleSearch"
      placeholder="请输入搜索内容"
      class="search-input"
    />
    <button class="search-btn" @click="handleSearch">搜索</button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: String
  },
  data() {
    return {
      inputValue: this.value || ''
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.inputValue)
    },
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
}

.search-input {
  padding: 10px 16px;
  width: 260px;
  border: 1px solid #ccc; /* 未选中为灰色 */
  border-radius: 24px 0 0 24px;
  outline: none;
  font-size: 16px;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(250,42,85,0.08);
}

.search-input:focus {
  box-shadow: 0 2px 12px rgba(250,42,85,0.18);
  border-color: #fa2a55; /* 选中为Apple Music色 */
}

.search-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 0 24px 24px 0;
  background: linear-gradient(90deg, #fa2a55 0%, #c471ed 100%);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(250,42,85,0.08);
}

.search-btn:hover {
  background: linear-gradient(90deg, #c471ed 0%, #fa2a55 100%);
  box-shadow: 0 4px 16px rgba(250,42,85,0.18);
}
</style>