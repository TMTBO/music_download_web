<template>
  <div id="app">
    <img
      alt="logo"
      src="./assets/logo.svg"
      style="
        width: 100px;
        height: 100px;
        filter: brightness(0) saturate(100%) invert(36%) sepia(97%)
          saturate(7492%) hue-rotate(-14deg) brightness(101%) contrast(101%);
      "
    />
    <SearchBar :value="searchQuery" @search="onSearch" />
    <TabBar
      :tabs="tabs"
      :activeTab="activeTab"
      @update:activeTab="activeTab = $event"
    />
    <MusicList :musicList="musicList" @page-change="onPageChange" />
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import TabBar from "./components/TabBar.vue";
import MusicList from "./components/MusicList.vue";
import musicSdk from "./musicSdk/index";

export default {
  name: "App",
  components: {
    SearchBar,
    TabBar,
    MusicList,
  },
  data() {
    return {
      searchQuery: "",
      tabs: musicSdk.sources.map((item) => item.name), // 用name字段作为tab
      activeTab: musicSdk.sources[0].name, // 默认第一个tab
      musicList: {},
    };
  },
  methods: {
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
      console.log("query page:", page, "source:", item.name);
      try {
        const result = await musicSdk.searchMusic({
          query: this.searchQuery,
          source: item.id,
          page,
          limit: 20,
        });
        this.musicList = result;
        console.log("搜索结果:", this.musicList);
      } catch (e) {
        alert("搜索失败: " + e);
      }
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
</style>
