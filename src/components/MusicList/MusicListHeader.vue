<template>
  <li class="music-item music-header">
    <div class="music-pic"></div>
    <div class="music-title">歌曲</div>
    <div class="music-singer">歌手</div>
    <div class="music-album">专辑</div>
    <div class="music-duration">时长</div>
    <div class="music-action">操作</div>
  </li>
</template>
<script>
export default {
  name: "MusicListHeader",
};
</script>

<style scoped>
.music-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  background: #faf7fb;
  color: #a05eb5;
  border-bottom: 2px solid #e5e0ea;
  min-height: 32px;
  padding: 12px 20px;
}
.music-pic {
  width: 48px;
  height: 48px;
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
  font-size: 14px;
}
.music-action {
  flex: none;
  width: 70px;
  text-align: center;
}
</style>
