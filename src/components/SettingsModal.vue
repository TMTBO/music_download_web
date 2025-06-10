<template>
  <div class="settings-modal">
    <div class="settings-content">
      <div class="settings-header">
        <span>设置</span>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      <div class="settings-body">
        <div class="setting-row">
          <label>音源：</label>
          <select v-model="selectedSource" @change="emitSource">
            <option v-for="src in sources" :key="src" :value="src">
              {{ src }}
            </option>
          </select>
        </div>
        <div class="setting-row">
          <label>存储目录：</label>
          <span>{{ storageDir || "未配置" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from "vue";
export default defineComponent({
  name: "SettingsModal",
  props: {
    currentSource: String,
    sources: Array,
    storageDir: String,
  },
  emits: ["close", "change-source"],
  setup(props, { emit }) {
    const selectedSource = ref(props.currentSource);

    watch(
      () => props.currentSource,
      (val) => {
        selectedSource.value = val;
      }
    );

    function emitSource() {
      emit("change-source", selectedSource.value);
    }
    function closeModal() {
      emit("close");
    }

    return {
      selectedSource,
      emitSource,
      closeModal,
    };
  },
});
</script>

<style scoped>
.settings-modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings-content {
  background: #fff;
  border-radius: 12px;
  min-width: 320px;
  min-height: 180px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 0 0 20px 0;
  overflow: auto;
}
.settings-header {
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
.settings-body {
  padding: 24px 36px 0 36px;
}
.setting-row {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.setting-row label {
  font-weight: 500;
  min-width: 80px;
}
</style>
