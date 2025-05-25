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
          <span>{{ item.name }}</span>
          <span class="progress">
            <span v-if="item.progress !== undefined && item.progress < 1" class="downloading">
              <span class="spinner"></span>
            </span>
            <span v-else-if="item.progress >= 1">完成</span>
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
  border-radius: 8px;
  min-width: 320px;
  min-height: 180px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 0 0 16px 0;
}
.download-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  padding: 16px 24px 8px 24px;
  border-bottom: 1px solid #eee;
}
.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #888;
  cursor: pointer;
}
.download-list-ul {
  list-style: none;
  margin: 0;
  padding: 16px 24px 0 24px;
}
.download-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 15px;
}
.download-list-item .progress {
  color: #a05eb5;
  font-size: 13px;
}
.empty-tip {
  color: #bbb;
  text-align: center;
  padding: 32px 0;
}
.downloading {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #a05eb5;
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
