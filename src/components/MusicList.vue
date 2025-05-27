<template>
  <div>
    <ul v-if="musicList.list && musicList.list.length" class="music-list">
      <MusicListHeader :showPic="pagedList.some((item) => item.meta.picUrl)" />
      <MusicListItem
        v-for="item in pagedList"
        :key="item.id"
        :item="item"
        @download="onDownload"
        :showPic="!!item.meta.picUrl"
        :showDropdown="showDropdown"
        @show-dropdown="showDropdown = $event"
        @fly-to-download="flyToDownload"
      />
      <transition name="fly-download">
        <MusicListItem
          v-if="flyAnim.show"
          :item="flyAnim.item"
          :showPic="!!flyAnim.item?.meta?.picUrl"
          :showDropdown="null"
          class="fly-anim"
          :style="flyAnim.style"
        />
      </transition>
    </ul>
    <div v-else class="empty-tip">暂无搜索结果</div>
    <div v-if="musicList.list && musicList.list.length" class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        上一页
      </button>
      <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script>
import musicSdk from "@/musicSdk/index";
import MusicListHeader from "./MusicListHeader.vue";
import MusicListItem from "./MusicListItem.vue";

export default {
  name: "MusicList",
  components: {
    MusicListHeader,
    MusicListItem,
  },
  props: {
    musicList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      showDropdown: null,
      flyAnim: {
        show: false,
        style: {},
        text: "",
      },
    };
  },
  computed: {
    pageSize() {
      return this.musicList.limit || 10;
    },
    totalPages() {
      return Math.ceil((this.musicList.total || 0) / this.pageSize) || 1;
    },
    pagedList() {
      return this.musicList.list || [];
    },
  },
  watch: {
    musicList: {
      handler() {
        this.currentPage = this.musicList.page || 1;
      },
      deep: true,
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$emit("page-change", page);
      }
    },
    async onDownload(item, quality) {
      try {
        const source = item.source || "mobi";
        const res = await musicSdk.getMusicURL({
          musicId: item.id,
          source,
          quality: quality.type,
        });
        if (!res || !res.url) throw new Error("未获取到下载链接");
        const name = `${item.name}-${item.singer}.${quality.format}`;
        this.$emit("add-download-task", {
          id: item.id,
          name,
          quality: quality.type,
          size: quality.size,
        });
        await musicSdk.downloadMusic({
          url: res.url,
          name: name,
        });
        this.$emit("finish-download-task", {
          id: item.id,
          name,
        });
      } catch (e) {
        alert("获取下载链接失败: " + (e.message || e));
      }
    },
    flyToDownload({ item, rect }) {
      const targetBtn = document.querySelector(".download-list-btn");
      if (!targetBtn) return;
      const targetRect = targetBtn.getBoundingClientRect();

      // 用 music-item 的样式做动画
      this.flyAnim = {
        show: true,
        text: item.name,
        item,
        style: {
          position: "fixed",
          left: rect.left + "px",
          top: rect.top + "px",
          width: rect.width + "px",
          height: rect.height + "px",
          zIndex: 9999,
          transition: "all 2.25s cubic-bezier(.4,2,.6,1)",
          opacity: 1,
          transform: "scale(1)",
          pointerEvents: "none",
        },
      };

      setTimeout(() => {
        this.flyAnim.style = {
          ...this.flyAnim.style,
          left: targetRect.left + targetRect.width / 2 + "px",
          top: targetRect.top - 20 + "px",
          width: targetRect.width * 0.4 + "px",
          height: targetRect.height * 0.4 + "px",
          opacity: 0,
          transform: "scale(0.5)",
        };
      }, 20);

      setTimeout(() => {
        this.flyAnim.show = false;
      }, 2250);
    },
  },
};
</script>

<style scoped>
.music-list {
  list-style: none;
  padding: 0;
  margin: 30px auto 0 auto;
  max-width: 700px;
}
.empty-tip {
  margin-top: 40px;
  color: #bbb;
  font-size: 16px;
}
.pagination {
  margin: 24px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
.pagination button {
  padding: 4px 16px;
  border-radius: 4px;
  border: 1px solid #fa2a55;
  background: #fff;
  color: #fa2a55;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}
.pagination button:disabled {
  color: #ccc;
  border-color: #eee;
  cursor: not-allowed;
  background: #f5f5f7;
}
.music-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  background: #fff;
}
.fly-anim {
  box-shadow: 0 4px 16px rgba(250, 42, 85, 0.18);
  user-select: none;
  will-change: left, top, width, height, opacity, transform;
  pointer-events: none;
  position: fixed;
}
.fly-download-enter-active,
.fly-download-leave-active {
  transition: opacity 0.7s;
}
.fly-download-enter,
.fly-download-leave-to {
  opacity: 0;
}
</style>
