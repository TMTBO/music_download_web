<template>
  <div class="download-list-modal" v-if="show">
    <div class="download-list-content">
      <div class="download-list-header">
        <span>下载列表</span>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <ul class="download-list-ul">
        <li v-if="downloadList.length === 0" class="empty-tip">暂无下载任务</li>
        <li
          v-for="item in downloadList"
          :key="item.id"
          class="download-list-item"
        >
          <span>
            {{ item.name }}
            <span v-if="item.quality || item.size" class="info">
              <span v-if="item.quality" class="capsule capsule-quality">{{
                item.quality
              }}</span>
              <span v-if="item.size" class="capsule capsule-size">{{
                item.size
              }}</span>
            </span>
          </span>
          <span class="progress">
            <span
              v-if="item.progress !== undefined && item.progress < 1"
              class="downloading"
            >
              <span class="spinner"></span>
            </span>
            <span
              v-else-if="item.progress >= 1"
              class="finished progress-finished"
              >完成</span
            >
            <span v-else>等待中</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadList",
  props: {
    show: Boolean,
    downloadList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.download-list-modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.download-list-content {
  background: #fff;
  border-radius: 12px;
  min-width: 50%;
  min-height: 50%;
  max-width: 90vw;
  max-height: 80vh;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 0 0 20px 0;
  overflow: auto;
}
.download-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  padding: 24px 36px 12px 36px;
  border-bottom: 1px solid #eee;
}
.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #888;
  cursor: pointer;
}
.download-list-ul {
  list-style: none;
  margin: 0;
  padding: 24px 36px 0 36px;
}
.download-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 17px;
}
.download-list-item .progress {
  color: #a05eb5;
  font-size: 15px;
  min-width: 60px;
  display: inline-block;
  text-align: right;
}
.empty-tip {
  color: #bbb;
  text-align: center;
  padding: 48px 0;
  font-size: 18px;
}
.downloading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #a05eb5;
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.capsule {
  display: inline-block;
  padding: 0 14px;
  height: 26px;
  line-height: 26px;
  border-radius: 14px;
  font-size: 14px;
  margin-left: 10px;
  background: #f5f0fa;
  color: #a05eb5;
  border: 1.5px solid #e5e0ea;
  vertical-align: middle;
}
.capsule-quality {
  background: #fae6f6;
  color: #fa2a55;
  border: 1.5px solid #fa2a55;
}
.capsule-size {
  background: #eaf6fa;
  color: #2a8cfa;
  border: 1.5px solid #2a8cfa;
}
/* 圆角美化完成按钮 */
.progress .finished,
.progress-finished {
  display: inline-block;
  padding: 0 16px;
  height: 26px;
  line-height: 26px;
  border-radius: 14px;
  background: #eafbe7;
  color: #2bb673;
  font-size: 15px;
  border: 1.5px solid #b6e2c7;
  margin-left: 8px;
}
</style>
