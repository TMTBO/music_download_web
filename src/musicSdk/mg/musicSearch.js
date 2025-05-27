import request from "@/utils/request";
import { formatSingerName, formatDuration, formatSize } from "../utils";

export default {
  qualityTypes: {
    PQ: "128k",
    HQ: "320k",
    SQ: "flac",
    ZQ24: "hires",
  },
  qualityFormat: {
    PQ: "mp3",
    HQ: "mp3",
    SQ: "flac",
    ZQ24: "flac",
  },
  /**
   * 咪咕音乐搜索
   * @param {string} str 搜索关键词
   * @param {number} page 页码（从1开始）
   * @param {number} limit 每页数量
   * @returns {Promise<MusicInfo[]>} 搜索结果
   */
  async search(str, page = 1, limit = 20) {
    const params = {
      keyword: str,
      page: page,
      limit: limit,
    };

    const res = await request.get("/music/mg/search", { params });

    let list = [];
    const rawData = res.data;
    if (rawData.resultList && Array.isArray(rawData.resultList)) {
      list = rawData.resultList
        .flat()
        .filter((item) => item && item.songId && item.copyrightId)
        .map((item) => {
          const qualities = item.audioFormats
            .map((format) => {
              const type = this.qualityTypes[format.formatType];
              if (!type) {
                console.warn(
                  "Unknown quality type:",
                  format.formatType,
                  "size:",
                  format.asize
                );
                return null;
              }
              return {
                type: type || format.formatType,
                size: formatSize(format.asize),
                format: this.qualityFormat[format.formatType] || "mp3",
              };
            })
            .filter((item) => item !== null);

          return {
            id: item.songId || "",
            name: item.name || "",
            singer: formatSingerName(item.singerList, "name") || "",
            source: "mg",
            interval: item.duration ? formatDuration(item.duration) : null,
            qualities: qualities,
            meta: {
              songId: item.songId || "",
              albumName: item.album || "",
              // picUrl: item.ALBUMPIC || null,
            },
          };
        });
    }
    return {
      list,
      page,
      total: rawData.totalCount ? rawData.totalCount : 0,
      limit: list.length,
    };
  },
};
