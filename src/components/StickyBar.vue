<template>
  <div class="sticky-bar" :class="{ 'is-sticky': isSticky }">
    <div class="bar-row">
      <img
        alt="logo"
        src="../assets/logo.svg"
        class="logo"
        :class="{ 'logo-sticky': isSticky }"
      />
      <SearchBar :value="searchQuery" @search="$emit('search', $event)" />
    </div>
    <div class="tabbar-row">
      <TabBar
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="$emit('tab-change', $event)"
      />
      <button
        class="tab-btn download-list-btn"
        @click="$emit('show-download-list')"
      >
        下载列表
      </button>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import TabBar from "./TabBar.vue";
export default {
  name: "StickyBar",
  components: { SearchBar, TabBar },
  props: {
    isSticky: Boolean,
    searchQuery: String,
    tabs: Array,
    activeTab: String,
  },
};
</script>

<style scoped>
.sticky-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  padding-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bar-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 12px 0 0 0;
}
.tabbar-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}
.logo {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  display: block;
  transition: width 0.3s, height 0.3s, transform 0.3s, margin 0.3s;
  will-change: width, height, transform, margin;
  filter: brightness(0) saturate(100%) invert(36%) sepia(97%) saturate(7492%)
    hue-rotate(-14deg) brightness(101%) contrast(101%);
}
.logo-sticky {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  transform: scale(0.8);
}
.logo-scale-enter-active,
.logo-scale-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.logo-scale-enter,
.logo-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.tab-btn,
.download-list-btn {
  padding: 6px 20px;
  border-radius: 6px;
  border: 1px solid #a05eb5;
  background: #fff;
  color: #a05eb5;
  font-size: 16px;
  cursor: pointer;
  margin-left: 8px;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.tab-btn:hover,
.download-list-btn:hover {
  background: #a05eb5;
  color: #fff;
  border-color: #a05eb5;
}
</style>
