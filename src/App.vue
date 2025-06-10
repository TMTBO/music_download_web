<template>
  <div id="app">
    <StickyBar
      :isSticky="isSticky"
      :searchQuery="searchQuery"
      :tabs="tabs"
      :activeTab="activeTab"
      :tabLoading="tabLoading"
      @search="onSearch"
      @tab-change="onTabChange"
      @show-download-list="showDownloadList = true"
    />
    <MusicList
      :musicList="musicList"
      @page-change="onPageChange"
      @add-download-task="addDownloadTask"
      @finish-download-task="finishDownloadTask"
    />
    <DownloadList
      :show="showDownloadList"
      :downloadList="downloadList"
      @close="showDownloadList = false"
    />
    <SettingsModal
      v-if="showSettings"
      :currentSource="activeSource"
      :sources="tabs"
      :storageDir="storageDir"
      @close="showSettings = false"
      @change-source="onChangeSource"
    />
  </div>
</template>

<script setup>
import StickyBar from "./components/StickyBar.vue";
import MusicList from "./components/MusicList/MusicList.vue";
import DownloadList from "./components/DownloadList.vue";
import useAppLogic from "./hooks/useAppLogic";
import SettingsModal from "./components/SettingsModal.vue"; // 新建的设置弹窗组件

const {
  searchQuery,
  tabs,
  activeTab,
  musicList,
  isSticky,
  showDownloadList,
  downloadList,
  tabLoading,
  onSearch,
  onTabChange,
  onPageChange,
  addDownloadTask,
  finishDownloadTask,
  onChangeSource,
  showSettings,
  activeSource,
} = useAppLogic();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
