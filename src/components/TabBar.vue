<template>
  <div class="tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab"
      :class="['tab-item', { active: tab === activeTab }]"
      @click="$emit('update:activeTab', tab)"
    >
      <span v-if="tab === activeTab && loading" class="tab-spinner"></span>
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.tab-bar {
  display: flex;
  justify-content: center;
  margin: 10px 0 10px 0;
  gap: 16px;
}

.tab-item {
  padding: 8px 28px;
  border-radius: 20px;
  background: #f5f5f7;
  color: #fa2a55;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border: 1px solid transparent;
  position: relative;
}

.tab-item.active {
  background: linear-gradient(90deg, #fa2a55 0%, #c471ed 100%);
  color: #fff;
  border: 1px solid #fa2a55;
}

.tab-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top: 2px solid #fa2a55;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
