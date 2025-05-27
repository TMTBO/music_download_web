import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import musicSdk from "../musicSdk/index";

export default function useAppLogic() {
  const searchQuery = ref("");
  const tabs = musicSdk.sources.map((item) => item.name);
  const activeTab = ref(musicSdk.sources[0].name);
  const musicList = ref({});
  const isSticky = ref(false);
  const showDownloadList = ref(false);
  const downloadList = reactive([]);

  function handleScroll() {
    // 这里假设 stickyBar 用 ref="stickyBar" 绑定在 StickyBar 组件外层
    const stickyBar = document.querySelector(".sticky-bar");
    if (!stickyBar) return;
    const { top } = stickyBar.getBoundingClientRect();
    isSticky.value = top <= 0;
  }

  function onSearch(query) {
    searchQuery.value = query;
    if (!query) {
      musicList.value = {}; // 清空 musicList
      return;
    }
    queryMusicList(1);
  }

  function onTabChange(tab) {
    activeTab.value = tab;
    queryMusicList(1);
  }

  async function onPageChange(page) {
    queryMusicList(page);
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
    handleScroll,
    onSearch,
    onTabChange,
    onPageChange,
    queryMusicList,
    addDownloadTask,
    finishDownloadTask,
  };
}
