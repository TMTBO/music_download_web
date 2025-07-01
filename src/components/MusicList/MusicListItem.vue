<template>
  <li class="music-item" ref="musicItem">
    <template v-if="picUrl !== undefined">
      <img
        :src="picUrl && picUrl.trim() !== '' ? picUrl : PLACEHOLDER_IMG"
        alt="pic"
        class="music-pic"
      />
    </template>
    <div class="music-title">{{ item.name }}</div>
    <div class="music-singer">{{ item.singer }}</div>
    <div class="music-album">{{ item.meta.albumName }}</div>
    <div class="music-duration">{{ item.interval }}</div>
    <div class="music-action" style="position: relative; display: flex; gap: 6px; justify-content: center;">
      <!-- 播放按钮 -->
      <button class="play-btn" @click="$emit('play', item)">
        ▶
      </button>
      <div
        class="download-btn"
        @mouseenter="$emit('show-dropdown', item.id)"
        @mouseleave="$emit('show-dropdown', null)"
      >
        <img src="../../assets/download.svg" alt="下载" style="width:18px;height:18px;vertical-align:middle;" />
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
import musicSdk from '@/musicSdk';

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8,<svg width='48' height='48' xmlns='http://www.w3.org/2000/svg'><rect width='48' height='48' fill='%23ededed'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cccccc' font-size='12'>No Img</text></svg>";

export default {
  name: "MusicListItem",
  props: {
    item: Object,
    showDropdown: [String, Number, null],
  },
  data() {
    return {
      picUrl: "",
      PLACEHOLDER_IMG,
    };
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      async handler(newItem) {
        if (newItem) {
          this.picUrl = await this.getPicUrl(newItem);
          console.log("获取音乐封面:", this.picUrl);
        }
      },
    },
  },
  methods: {
    async getPicUrl(item) {
      return await musicSdk.getPicURL(item);
    },
    handleQualityClick(q) {
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
  width: 90px;
  text-align: center;
  position: relative;
  display: flex;
  gap: 6px;
  justify-content: center;
}
.play-btn {
  border: 1px solid #a05eb5;
  background: #fff;
  color: #a05eb5;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 15px;
  margin-right: 2px;
  transition: background 0.2s, color 0.2s;
}
.play-btn:hover {
  background: #a05eb5;
  color: #fff;
}
.download-btn {
  flex: none;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #fa2a55;
  background: #fff;
  color: #fa2a55;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s, color 0.2s;
  position: relative;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.download-btn img {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  filter: invert(36%) sepia(97%) saturate(7492%) hue-rotate(-14deg) brightness(101%) contrast(101%);
  transition: filter 0.2s;
}
.download-btn:hover {
  background: #fa2a55;
  color: #fff;
}
.download-btn:hover img {
  filter: brightness(0) invert(1);
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
