<template>
  <div>
    <ul v-if="musicList.list && musicList.list.length" class="music-list">
      <li v-for="item in pagedList" :key="item.id" class="music-item">
        <img
          v-if="item.meta.picUrl"
          :src="item.meta.picUrl"
          alt="pic"
          class="music-pic"
        />
        <div class="music-title">{{ item.name }}</div>
        <div class="music-singer">{{ item.singer }}</div>
        <div class="music-album">{{ item.meta.albumName }}</div>
        <div class="music-duration">{{ item.interval }}</div>
        <button class="download-btn">下载</button>
      </li>
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
export default {
  name: "MusicList",
  props: {
    musicList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
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
      // musicList.list 已经是当前页的数据
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
.music-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.music-pic {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 12px;
}
.music-title {
  flex: 2;
  text-align: left;
}
.music-singer,
.music-album,
.music-duration {
  flex: 1;
  text-align: center;
  color: #888;
  font-size: 14px;
}
.download-btn {
  flex: none;
  margin-left: 10px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #fa2a55;
  background: #fff;
  color: #fa2a55;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}
.download-btn:hover {
  background: #fa2a55;
  color: #fff;
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
