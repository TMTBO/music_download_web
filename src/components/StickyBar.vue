<template>
  <div class="sticky-bar" :class="{ 'is-sticky': isSticky }">
    <div class="bar-row">
      <img
        alt="logo"
        src="../assets/logo.svg"
        class="logo"
        :class="{ 'logo-sticky': isSticky }"
      />
      <SearchBar
        :value="searchQuery"
        @search="(q, done) => $emit('search', q, done)"
      />
      <!-- 播放器浮动在右上角 -->
      <div class="aplayer-float">
        <Vue3APlayer
          v-if="currentAudio"
          :music="currentAudio"
          :mini="false"
          :autoplay="true"
          :float="true"
          style="width: 320px"
        />
      </div>
    </div>
    <div class="tabbar-row">
      <TabBar
        :tabs="tabs"
        :activeTab="activeTab"
        :loading="tabLoading"
        @update:activeTab="$emit('tab-change', $event)"
      />
      <button
        class="tab-btn download-list-btn"
        @click="$emit('show-download-list')"
      >
        下载列表
      </button>
      <button class="settings-btn" @click="$emit('show-settings')">
        <span class="icon">
          <img src="../assets/settings.svg" alt="设置" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import TabBar from "./TabBar.vue";
import Vue3APlayer from "vue3-aplayer";

export default {
  name: "StickyBar",
  components: { SearchBar, TabBar, Vue3APlayer },
  props: {
    isSticky: Boolean,
    searchQuery: String,
    tabs: Array,
    activeTab: String,
    tabLoading: Boolean,
    currentAudio: {
      type: [Array, Object],
      default: () => null,
    },
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
  position: relative;
}
.aplayer-float {
  position: absolute;
  right: 32px;
  top: 0;
  z-index: 101;
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
  margin-left: 20px;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.tab-btn:hover,
.download-list-btn:hover {
  background: #a05eb5;
  color: #fff;
  border-color: #a05eb5;
}
.settings-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 20px;
  border-radius: 8px;
  border: none;
  background: transparent; /* 移除底色，改为透明 */
  color: #333;
  font-size: 16px;
  font-weight: 600;
  box-shadow: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.1s;
  outline: none;
}
.settings-btn:hover {
  /* color: #111; */
  transform: translateY(-1px) scale(1.03);
}
.settings-btn:active {
  transform: scale(0.98);
}
.settings-btn .icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ededed; /* 默认更明显的浅灰色圆形背景 */
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(160, 94, 181, 0.08);
  margin-right: 8px;
  transition: background 0.2s;
}
.settings-btn .icon img {
  display: none;
}
.settings-btn .icon::before {
  content: "";
  display: block;
  width: 24px;
  height: 24px;
  mask: url("../assets/settings.svg") no-repeat center/contain;
  -webkit-mask: url("../assets/settings.svg") no-repeat center/contain;
  background: #fa2a55;
  transition: background 0.2s;
}
.settings-btn:hover .icon::before {
  background: #a05eb5;
}
</style>
