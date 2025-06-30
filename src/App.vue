<template>
  <div id="app">
    <StickyBar
      :isSticky="isSticky"
      :searchQuery="searchQuery"
      :tabs="tabs"
      :activeTab="activeTab"
      :tabLoading="tabLoading"
      :currentAudio="currentAudio"
      @search="onSearch"
      @tab-change="onTabChange"
      @show-download-list="showDownloadList = true"
      @show-settings="showSettings = true"
    />
    <MusicList
      :musicList="musicList"
      :activeSource="activeSource"
      @page-change="onPageChange"
      @add-download-task="addDownloadTask"
      @finish-download-task="finishDownloadTask"
      @play="onPlay"
    />
    <!-- <Vue3APlayer
      v-if="currentAudio"
      :music="currentAudio"
      :mini="false"
      :autoplay="true"
      style="position:fixed;right:24px;bottom:24px;z-index:9999;width:340px;box-shadow:0 2px 8px rgba(0,0,0,0.12);border-radius:12px;"
    /> -->
    <DownloadList
      :show="showDownloadList"
      :downloadList="downloadList"
      @close="showDownloadList = false"
    />
    <SettingsModal
      v-if="showSettings"
      :currentSource="activeSource"
      :sources="source"
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
import SettingsModal from "./components/SettingsModal.vue";

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
  source,
  currentAudio,
  onPlay,
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
