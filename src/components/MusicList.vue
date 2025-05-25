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
      />
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
        const source = item.source || "kw";
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
</style>
