import request from "@/utils/request";
import { formatDuration } from "../utils";
import { getMusicQualityInfo } from "./quality_detail";

export default {
  /**
   * 网易云音乐搜索
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

    const res = await request.get("/music/wy/search", { params });

    let list = [];
    const rawData = res.data.result;
    if (rawData.songs && Array.isArray(rawData.songs)) {
      for (const item of rawData.songs) {
        const qualities = await getMusicQualityInfo(item.id);

        list.push({
          id: item.id || "",
          name: item.name || "",
          singer: item.ar.map((singer) => singer.name).join("、") || "",
          source: "wy",
          interval: item.dt ? formatDuration(item.dt / 1000) : null,
          qualities: qualities,
          meta: {
            songId: item.id || "",
            albumName: item.al.name || "",
            // picUrl: item.ALBUMPIC || null,
          },
        });
      }
    }

    const total = rawData.songCount ? rawData.songCount : 0;
    return {
      list,
      page,
      total,
      limit: list.length,
    };
  },
};
