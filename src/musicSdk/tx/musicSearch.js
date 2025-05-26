import request from "@/utils/request";
import { formatSingerName, formatDuration, formatSize } from "../utils";

export default {
  /**
   * QQ音乐搜索
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

    const res = await request.get("/music/tx/search", { params });

    let list = [];
    const rawData = res.data;
    if (
      rawData.body &&
      rawData.body.item_song &&
      Array.isArray(rawData.body.item_song)
    ) {
      list = rawData.body.item_song
        .filter((item) => item && item.file?.media_mid)
        .map((item) => {
          const qualities = [];
          const file = item.file;
          if (file.size_128mp3 != 0) {
            qualities.push({
              type: "128k",
              size: formatSize(file.size_128mp3),
              format: "mp3",
            });
          }
          if (file.size_320mp3 != 0) {
            qualities.push({
              type: "320k",
              size: formatSize(file.size_320mp3),
              format: "mp3",
            });
          }
          if (file.size_flac != 0) {
            qualities.push({
              type: "flac",
              size: formatSize(file.size_flac),
              format: "flac",
            });
          }
          if (file.size_hires != 0) {
            qualities.push({
              type: "hires",
              size: formatSize(file.size_hires),
              format: "flac",
            });
          }
          if (file.size_new[1] != 0) {
            qualities.push({
              type: "atmos",
              size: formatSize(file.size_new[1]),
              format: "flac",
            });
          }
          if (file.size_new[2] != 0) {
            qualities.push({
              type: "atmos_plus",
              size: formatSize(file.size_new[2]),
              format: "flac",
            });
          }
          if (file.size_new[0] != 0) {
            qualities.push({
              type: "master",
              size: formatSize(file.size_new[0]),
              format: "flac",
            });
          }

          return {
            id: item.mid || "",
            name: item.name + (item.title_extra ?? "") || "",
            singer: formatSingerName(item.singer, "name") || "",
            source: "tx",
            interval: item.interval ? formatDuration(item.interval) : null,
            qualities: qualities,
            meta: {
              songId: item.id || "",
              albumName: item.album && item.album.name ? item.album.name : "",
              // picUrl: item.ALBUMPIC || null,
            },
          };
        });
    }

    const cPage =
      rawData.meta && rawData.meta.curpage ? rawData.meta.curpage : page;
    const total =
      rawData.meta && rawData.meta.estimate_sum ? rawData.meta.estimate_sum : 0;
    const cLimit =
      rawData.meta && rawData.meta.perpage ? rawData.meta.perpage : limit;
    return {
      list,
      page: cPage,
      total,
      limit: cLimit,
    };
  },
};
