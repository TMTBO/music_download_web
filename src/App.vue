<template>
  <div id="app">
    <div class="sticky-bar" :class="{ 'is-sticky': isSticky }" ref="stickyBar">
      <transition name="logo-scale">
        <img
          alt="logo"
          src="./assets/logo.svg"
          class="logo"
          :class="{ 'logo-sticky': isSticky }"
        />
      </transition>
      <SearchBar :value="searchQuery" @search="onSearch" />
      <div class="tabbar-right">
        <TabBar
          :tabs="tabs"
          :activeTab="activeTab"
          @update:activeTab="activeTab = $event"
        />
        <button
          class="tab-btn download-list-btn"
          @click="showDownloadList = true"
        >
          下载列表
        </button>
      </div>
    </div>
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

<script>
import SearchBar from "./components/SearchBar.vue";
import TabBar from "./components/TabBar.vue";
import MusicList from "./components/MusicList.vue";
import DownloadList from "./components/DownloadList.vue";
import musicSdk from "./musicSdk/index";

export default {
  name: "App",
  components: {
    SearchBar,
    TabBar,
    MusicList,
    DownloadList,
  },
  data() {
    return {
      searchQuery: "",
      tabs: musicSdk.sources.map((item) => item.name),
      activeTab: musicSdk.sources[0].name,
      musicList: {},
      isSticky: false,
      showDownloadList: false,
      downloadList: [],
    };
  },
  watch: {
    activeTab() {
      // 切换tab时自动请求第一页
      if (this.searchQuery) {
        this.queryMusicList(1);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const stickyBar = this.$refs.stickyBar;
      if (!stickyBar) return;
      const { top } = stickyBar.getBoundingClientRect();
      this.isSticky = top <= 0;
    },
    async onSearch(query) {
      this.searchQuery = query;
      this.queryMusicList(1);
    },
    async onPageChange(page) {
      this.queryMusicList(page);
    },
    async queryMusicList(page = 1) {
      if (!this.searchQuery) return;

      const item = musicSdk.sources.find(
        (source) => source.name === this.activeTab
      );
      if (!item) {
        alert("未找到对应的音乐源");
        return;
      }

      try {
        const result = await musicSdk.searchMusic({
          query: this.searchQuery,
          source: item.id,
          page,
          limit: 20,
        });
        this.musicList = result;
        console.log("搜索结果:", item.name, this.musicList);
      } catch (e) {
        alert("搜索失败: " + e);
      }
    },
    addDownloadTask(task) {
      // 避免重复添加
      if (!this.downloadList.find((t) => t.id === task.id)) {
        console.log("添加下载任务:", task);
        this.downloadList.push({ ...task, progress: 0 });
      }
    },
    finishDownloadTask({ id }) {
      const task = this.downloadList.find((t) => t.id === id);
      if (task) task.progress = 1;
    },
  },
};
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
.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto 0px auto;
  display: block;
  transition: width 0.3s, height 0.3s, transform 0.3s, margin 0.3s;
  will-change: width, height, transform, margin;
  filter: brightness(0) saturate(100%) invert(36%) sepia(97%) saturate(7492%)
    hue-rotate(-14deg) brightness(101%) contrast(101%);
}
.logo-sticky {
  width: 48px;
  height: 48px;
  margin: 8px auto 0px auto;
  transform: scale(0.7) translateY(-10px);
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
.tabbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
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
