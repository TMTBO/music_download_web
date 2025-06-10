import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import musicSdk from "../musicSdk/index";

export default function useAppLogic() {
  const searchQuery = ref("");
  const tabs = musicSdk.sources.map((item) => item.name);
  const source = musicSdk.source.map((item) => item.name); // 这里用 id

  // 读取本地存储的音源id
  const savedSource = localStorage.getItem("activeSource");
  const activeSource = ref(
    savedSource && source.includes(savedSource) ? savedSource : source[0]
  );

  const activeTab = ref(musicSdk.sources[0].name);
  const musicList = ref({});
  const isSticky = ref(false);
  const showDownloadList = ref(false);
  const downloadList = reactive([]);
  const tabLoading = ref(false);
  const showSettings = ref(false);

  function handleScroll() {
    const stickyBar = document.querySelector(".sticky-bar");
    if (!stickyBar) return;
    isSticky.value = top <= 0;
  }

  // 支持 done 回调
  async function onSearch(query, done) {
    searchQuery.value = query;
    if (!query) {
      musicList.value = {};
      tabLoading.value = false;
      done && done();
      return;
    }
    tabLoading.value = true;
    try {
      await queryMusicList(1);
    } finally {
      tabLoading.value = false;
      done && done();
    }
  }

  async function onTabChange(tab) {
    activeTab.value = tab;
    tabLoading.value = true;
    try {
      await queryMusicList(1);
    } finally {
      tabLoading.value = false;
    }
  }

  async function onPageChange(page) {
    await queryMusicList(page);
  }

  async function queryMusicList(page = 1) {
    if (!searchQuery.value) return;
    const item = musicSdk.sources.find(
      (source) => source.name === activeTab.value
    );
    if (!item) {
      alert("未找到对应的音乐源");
      return;
    }
    try {
      const result = await musicSdk.searchMusic({
        query: searchQuery.value,
        source: item.id,
        page,
        limit: 20,
      });
      musicList.value = result;
    } catch (e) {
      alert("搜索失败: " + e);
    }
  }

  function addDownloadTask(task) {
    if (!downloadList.find((t) => t.id === task.id)) {
      downloadList.push({ ...task, progress: 0 });
    }
  }

  function finishDownloadTask({ id }) {
    const task = downloadList.find((t) => t.id === id);
    if (task) task.progress = 1;
  }

  function onChangeSource(sourceName) {
    activeSource.value = sourceName;
    localStorage.setItem("activeSource", sourceName);
  }

  onMounted(() =>
    window.addEventListener("scroll", handleScroll, { passive: true })
  );
  onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));

  return {
    searchQuery,
    tabs,
    activeTab,
    musicList,
    isSticky,
    showDownloadList,
    downloadList,
    tabLoading,
    handleScroll,
    onSearch,
    onTabChange,
    onPageChange,
    queryMusicList,
    addDownloadTask,
    finishDownloadTask,
    onChangeSource,
    showSettings,
    activeSource,
    source,
  };
}
