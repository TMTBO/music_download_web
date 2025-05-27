<template>
  <li class="music-item" ref="musicItem">
    <template v-if="showPic">
      <img :src="item.meta.picUrl" alt="pic" class="music-pic" />
    </template>
    <div class="music-title">{{ item.name }}</div>
    <div class="music-singer">{{ item.singer }}</div>
    <div class="music-album">{{ item.meta.albumName }}</div>
    <div class="music-duration">{{ item.interval }}</div>
    <div class="music-action" style="position: relative">
      <div
        class="download-btn"
        @mouseenter="$emit('show-dropdown', item.id)"
        @mouseleave="$emit('show-dropdown', null)"
      >
        下载
        <ul
          v-if="
            showDropdown === item.id && item.qualities && item.qualities.length
          "
          class="quality-dropdown"
        >
          <li
            v-for="q in item.qualities"
            :key="q.type"
            class="quality-item"
            @click.stop="handleQualityClick(q, $event)"
          >
            {{ q.type }}
            <span v-if="q.size" style="color: #888; font-size: 12px"
              >({{ q.size }})</span
            >
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "MusicListItem",
  props: {
    item: Object,
    showPic: Boolean,
    showDropdown: [String, Number, null],
  },
  methods: {
    handleQualityClick(q) {
      // 获取 music-item 的位置信息
      const rect = this.$refs.musicItem.getBoundingClientRect();
      this.$emit("fly-to-download", {
        item: this.item,
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
      });
      this.$emit("download", this.item, q);
    },
  },
};
</script>

<style scoped>
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
  flex: none;
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
.music-action {
  flex: none;
  width: 70px;
  text-align: center;
  position: relative;
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
  position: relative;
  user-select: none;
}
.download-btn:hover {
  background: #fa2a55;
  color: #fff;
}
.quality-dropdown {
  position: absolute;
  left: 0;
  top: 105%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  min-width: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 4px 0;
}
.quality-item {
  padding: 6px 16px;
  cursor: pointer;
  color: #fa2a55;
  font-size: 14px;
  white-space: nowrap;
  transition: background 0.2s;
}
.quality-item:hover {
  background: #fa2a55;
  color: #fff;
}
</style>
