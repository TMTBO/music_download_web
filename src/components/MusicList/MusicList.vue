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
    <MusicListPagination
      v-if="musicList.list && musicList.list.length"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import MusicListHeader from "./MusicListHeader.vue";
import MusicListItem from "./MusicListItem.vue";
import MusicListPagination from "./MusicListPagination.vue";

import useMusicList from "./useMusicList";

export default {
  name: "MusicList",
  components: {
    MusicListHeader,
    MusicListItem,
    MusicListPagination,
  },
  props: {
    musicList: {
      type: Object,
      required: true,
    },
    activeSource: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    return useMusicList(props, emit);
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
