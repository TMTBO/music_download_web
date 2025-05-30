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
  </div>
</template>

<script setup>
import StickyBar from "./components/StickyBar.vue";
import MusicList from "./components/MusicList/MusicList.vue";
import DownloadList from "./components/DownloadList.vue";
import useAppLogic from "./hooks/useAppLogic";

window.RUNTIME_CONFIG = {
  SERVER_IP: "__SERVER_IP__",
  SERVER_PORT: "__SERVER_PORT__",
};

const {
  searchQuery,
  tabs,
  activeTab,
  musicList,
  isSticky,
  showDownloadList,
  downloadList,
  tabLoading, // 新增
  onSearch,
  onTabChange,
  onPageChange,
  addDownloadTask,
  finishDownloadTask,
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
