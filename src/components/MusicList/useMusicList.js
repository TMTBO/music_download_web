import { ref, computed, watch } from "vue";
import musicSdk from "@/musicSdk/index";

export default function useMusicList(props, emit) {
  const currentPage = ref(1);
  const showDropdown = ref(null);
  const flyAnim = ref({
    show: false,
    style: {},
    item: {},
  });

  const pageSize = computed(() => props.musicList.limit || 10);
  const totalPages = computed(
    () => Math.ceil((props.musicList.total || 0) / pageSize.value) || 1
  );
  const pagedList = computed(() => props.musicList.list || []);

  watch(
    () => props.musicList,
    (val) => {
      currentPage.value = val.page || 1;
    },
    { deep: true }
  );

  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      emit("page-change", page);
    }
  }

  async function onDownload(item, quality) {
    try {
      const source = item.source || "mobi";
      const activeSource = musicSdk.source.find(
        (sourceItem) => sourceItem.name === props.activeSource
      ).id;
      const res = await musicSdk.getMusicURL({
        musicId: item.id,
        source,
        quality: quality.type,
        activeSource: activeSource, // 关键：传递当前激活的源
      });
      if (!res || !res.url) throw new Error("未获取到下载链接");
      const name = `${item.name}-${item.singer}.${quality.format}`;
      emit("add-download-task", {
        id: item.id,
        name,
        quality: quality.type,
        size: quality.size,
      });
      await musicSdk.downloadMusic({
        url: res.url,
        name: name,
      });
      emit("finish-download-task", {
        id: item.id,
        name,
      });
    } catch (e) {
      alert("获取下载链接失败: " + (e.message || e));
    }
  }

  function flyToDownload({ item, rect }) {
    const targetBtn = document.querySelector(".download-list-btn");
    if (!targetBtn) return;
    const targetRect = targetBtn.getBoundingClientRect();

    flyAnim.value = {
      show: true,
      item,
      style: {
        position: "fixed",
        left: rect.left + "px",
        top: rect.top + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        zIndex: 9999,
        transition: "all 0.6s cubic-bezier(.4,2,.6,1)",
        opacity: 1,
        transform: "scale(1)",
        pointerEvents: "none",
        background: "#fff",
      },
    };

    setTimeout(() => {
      flyAnim.value.style = {
        ...flyAnim.value.style,
        left: targetRect.left + "px",
        top: targetRect.top + "px",
        width: targetRect.width * 0.4 + "px",
        height: targetRect.height * 0.4 + "px",
        opacity: 0,
        transform: "scale(0.5)",
      };
    }, 20);

    setTimeout(() => {
      flyAnim.value.show = false;
    }, 650);
  }

  return {
    currentPage,
    showDropdown,
    flyAnim,
    pageSize,
    totalPages,
    pagedList,
    changePage,
    onDownload,
    flyToDownload,
  };
}
