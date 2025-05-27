<template>
  <div class="search-bar">
    <input
      v-model="inputValue"
      @keyup.enter="handleSearch"
      placeholder="请输入搜索内容"
      class="search-input"
    />
    <button
      v-if="inputValue"
      class="clear-btn"
      @click="clearInput"
      aria-label="清空"
      title="清空"
    >
      ×
    </button>
    <button class="search-btn" :disabled="loading" @click="handleSearch">
      <span v-if="loading" class="spinner"></span>
      <span v-else>搜索</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    value: String,
  },
  data() {
    return {
      inputValue: this.value || "",
      loading: false,
    };
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
  },
  methods: {
    async handleSearch() {
      if (!this.inputValue) return;
      this.loading = true;
      this.$emit("search", this.inputValue, this.finishLoading);
    },
    clearInput() {
      this.inputValue = "";
      this.loading = false;
      this.$emit("search", ""); // 通知父组件清空
    },
    finishLoading() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: relative;
}
.search-input {
  padding: 10px 16px;
  width: 260px;
  border: 1px solid #ccc;
  border-radius: 24px 0 0 24px;
  outline: none;
  font-size: 16px;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(250, 42, 85, 0.08);
}
.search-input:focus {
  box-shadow: 0 2px 12px rgba(250, 42, 85, 0.18);
  border-color: #fa2a55;
}
.clear-btn {
  position: absolute;
  right: 90px;
  background: #f5f5f7; /* 灰色背景 */
  border: none;
  color: #fa2a55;
  font-size: 26px; /* 更大更明显 */
  cursor: pointer;
  outline: none;
  z-index: 2;
  padding: 0 8px;
  height: 32px;
  width: 32px;
  line-height: 32px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(250, 42, 85, 0.08);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clear-btn:hover {
  background: #fa2a55;
  color: #fff;
  box-shadow: 0 4px 16px rgba(250, 42, 85, 0.18);
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
  box-shadow: 0 2px 8px rgba(250, 42, 85, 0.08);
}
.search-btn:hover {
  background: linear-gradient(90deg, #c471ed 0%, #fa2a55 100%);
  box-shadow: 0 4px 16px rgba(250, 42, 85, 0.18);
}
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2.5px solid #fff;
  border-top: 2.5px solid #fa2a55;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
  margin-right: 2px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
